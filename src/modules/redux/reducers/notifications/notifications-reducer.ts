import { NotificationType } from "../../../types/types"
import { InferActionsTypes } from "../../store"


const initialState = {
    isActive: true as boolean,
    notifications: [] as Array<NotificationType>,
    newNotification: null as  NotificationType | null

}

export type NotificationsStateType = typeof initialState
export type NotificationsActionsTypes = InferActionsTypes<typeof notificationsActions>



//AC 
export const notificationsActions = {
    changeNotificationStatus: (bool: boolean) => ({ type: 'notifications/NOTIFICATIONS_STATUS', bool } as const),
    setNotification: (notification: NotificationType) => ({ type: 'notifications/SET_NOTIFICATION', notification } as const),
    deleteNotification: (notificationId: number) => ({ type: 'notifications/DELETE_NOTIFICATION', notificationId } as const),
    resetNotifications: () => ({ type: 'notifications/NOTIFICATIONS_RESET' } as const),
    deleteNewNotification: (notificationId: number) => ({ type: 'notifications/DELETE_NEW_NOTIFICATION' } as const)
}









//REDUCER
const notifications = (state: NotificationsStateType = initialState, action: NotificationsActionsTypes): NotificationsStateType => {
    switch (action.type) {
        case 'notifications/NOTIFICATIONS_STATUS':
            if (state.isActive !== action.bool) {


                return !action.bool
                    ? { ...state, isActive: action.bool, notifications: [] }
                    : { ...state, isActive: action.bool }
            }
            return state;


        case 'notifications/SET_NOTIFICATION':
            let checkExist = false
        if(action.notification.message){

        }
           

            let newNotification = state.newNotification
            if (checkExist) {
                return state
            } else {
                let resultNotifications = [...state.notifications]
                if (state.notifications.length < 7) {

                    resultNotifications.unshift(action.notification)
                } else {
                    resultNotifications.splice(state.notifications.length - 1, 1)
                    resultNotifications.unshift(action.notification)
                }
                if (state.newNotification) {
                    if (state.newNotification.message.id !== action.notification.message.id) {
                        newNotification = action.notification
                    }

                } else {
                    newNotification = action.notification
                }
                return { ...state, notifications: resultNotifications, newNotification };
            }


        case 'notifications/DELETE_NOTIFICATION':

            return { ...state, notifications: [], newNotification: null };

        case 'notifications/DELETE_NOTIFICATION':
            let resultNotification = state.notifications.filter(n => n.message.id !== action.notificationId)

            return { ...state, notifications: resultNotification }

        case 'notifications/DELETE_NEW_NOTIFICATION':
            return { ...state, newNotification: null }


        default:
            return state;
    }

}
export default notifications