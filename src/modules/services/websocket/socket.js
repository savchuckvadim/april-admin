import Echo from 'laravel-echo'
import { api } from '../api-laravel'
import { setNewMessage } from '../../redux/reducers/dialogs/dialogs-reducer'
import { notificationsActions, setNotification } from '../../redux/reducers/notifications/notifications-reducer'
import { usersActions } from '../../redux/reducers/users/users-reducer'

//TODO TypeScript

export let echo
export const socket = {

  async connection(authUserId, dispatch) {
    window.Pusher = require('pusher-js')
    await api.get("/sanctum/csrf-cookie")
    await api.get('api/user')

    echo = new Echo({

      broadcaster: 'pusher',
      key: 'socket_key',
      cluster: 'mt1',
      forceTLS: false,
      disableStats: true,
      wsHost: '127.0.0.1',
      wsPort: 6001,
      authorizer: (channel, options) => {
        console.log('websocket connection is success')
        console.log(channel)

        return {
          authorize: (socketId, callback) => {
            api.post('api/broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name,
            })

              .then((response) => {

                callback(false, response.data)
              })
              .catch((error) => {
                callback(true, error)
              })
          }
        }
      }

    })
    console.log('echo')
    console.log(echo)

    await this.postListener(dispatch)
    await this.precenseListener(dispatch)
    await this.newMessageListener(authUserId, dispatch)

    // })


  },
  async postListener(dispatch) {

    if (echo) {

      echo.private(`send-post`)
        .listen('SendPost', (e) => {
          console.log(e)
          dispatch(notificationsActions.setNotification(e))
        })

    } else {

      setTimeout(async () => {
        await socket.connection()
        await socket.postListener()
      }, 2000)


    }
  },
  async precenseListener(dispatch) {

    if (echo) {

      echo.join(`socio-chat`)
        .here((ids) => {

          console.log(ids)

          dispatch(usersActions.setOnline(ids))
        })
        .joining((userId) => {

          console.log(userId)
          dispatch(usersActions.addOnline(userId))

        })
        .leaving((userId) => {

          console.log(`leaving ${userId}`)
          dispatch(usersActions.deleteOnline(userId))


        })

        .error((error) => {
          console.error(error);
        });
    } else {

      setTimeout(async () => {
        await socket.connection(dispatch)
        await socket.precenseListener(dispatch)
      }, 2000)


    }
  },
  async newMessageListener(authUserId, dispatch) {
    if (echo) {

      echo.private(`new-message.${authUserId}`)

        .listen('.SendMessage', (e) => {
          dispatch(setNewMessage(e.message, authUserId))
          dispatch(notificationsActions.setNotification(e))
        })

    } else {

      setTimeout(async () => {
        await socket.connection(dispatch)

      }, 2000)


    }
  },
  async reconnect(authUserId, dispatch) {
    if (echo) {
      console.log('reconnect')

      setTimeout(async () => {
        await socket.reconnect(authUserId, dispatch)
      }, 100000)
    } else {

      await socket.connection(authUserId, dispatch)
      await socket.reconnect(authUserId, dispatch)
    }
  }

}