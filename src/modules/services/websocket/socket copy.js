import Echo from 'laravel-echo'
import { setNewMessage } from '../../redux/dialogs-reducer'
import { setNotification } from '../../redux/notifications-reducer'
import { addOnline, deleteOnline, setOnline } from '../../redux/users-reducer'
import { api, instance } from '../api/api'


export let echo
export const socket = {

  async connection(authUserId, dispatch) {

    window.Pusher = require('pusher-js')
    await instance.get("/sanctum/csrf-cookie")
    await api.get('user')


    echo = new Echo({

      broadcaster: 'pusher',
      key: 's3cr3t',
      cluster: 'mt1',
      forceTLS: false,
      disableStats: true,
      wsHost: '45.12.18.182',
      wsPort: 6001,
      wssHost: 'https://back.nmbrs-chat.store',
      wssPort: 6001,
      authorizer: (channel, options) => {
        console.log('websocket connection is success')
        console.log(channel)
        
        return {
          authorize: (socketId, callback) => {
            api.post('broadcasting/auth', {
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

    await socket.precenseListener(dispatch)  //connect at precense channel
    await socket.newMessageListener(authUserId, dispatch) //connect at new-message channel
  },
  async precenseListener(dispatch) {

    if (echo) {

      echo.join(`chat`)
        .here((ids) => {
          console.log(ids)

          dispatch(setOnline(ids))
        })
        .joining((userId) => {

          console.log(userId)
          dispatch(addOnline(userId))

        })
        .leaving((userId) => {
          console.log(`leaving ${userId}`)
          dispatch(deleteOnline(userId))


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
          dispatch(setNotification(e))

        })
    } else {

      setTimeout(async () => {
        await socket.connection(dispatch)
  
      }, 2000)


    }
  },
  async reconnect(authUserId, dispatch) {
    if (echo) {
      setTimeout(async () => {
        await socket.reconnect(authUserId, dispatch)
      }, 10000)
    } else {
      await socket.connection(authUserId, dispatch)
      await socket.reconnect(authUserId, dispatch)
    }
  }
}
  // async newMessageConnection() {
  //   echo.private('new-message')
  //     .listen('.SendMessage', (e) => {
  //       alert(e.message.body)
  //       console.log(e)
  //     })
  // },



