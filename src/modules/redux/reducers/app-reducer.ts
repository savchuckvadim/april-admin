// import { googleAPI } from '../../services/google-api/google-api'
import { onlineAPI } from '../../services/april-online-api/online-api'
import { generalAPI } from '../../services/firebase-api/firebase-api'
import { aitest } from '../../services/openai-api/openai-api'
import { PreloaderCodesEnum } from '../../types/types'
import { InferActionsTypes, ThunkType } from '../store'
import { getAuthApp } from './auth/auth-reducer'
// import { getDialogs } from './dialogs/dialogs-reducer'
import { inProgress, InProgressType } from './preloader/preloader-reducer'

//TYPES
type AppStateType = typeof initialState
type InitialActionType = InferActionsTypes<typeof initialActions>
type AuthThunkType = ThunkType<InitialActionType | InProgressType>

// STATE
let initialState = {
    initialized: true as boolean,
}


//ACTION CREATORS
const initialActions = {
    initializedSuccess: () => ({ type: 'SP/APP/INITIALIZED_SUCCES' } as const)
}



//THUNKS
export const initialize = (): AuthThunkType => async (dispatch) => {
    dispatch(inProgress(true, PreloaderCodesEnum.Global))//inProgress-status
    // const fields = await googleAPI.getFields()


    // let promiseAuth = () => {
    //     return dispatch(getAuthApp())

    // }
    // await promiseAuth()

    ///////////////TEST GET DEALS
    // const deals = await onlineAPI.getDeals('domain', 'april-dev.bitrix24.ru')
    
    /////////TEST PORTAL GET



    // let getportal = await onlineAPI.getPortal('april-dev.bitrix24.ru')
    let getportals = await onlineAPI.getPortals()
    
    // let templates = await onlineAPI.getCollection(`templates/all`, 'templates')
    // let fields = await onlineAPI.getCollection(`fields/all`, 'fields')
    
   
    // let fieldsGeneral = await onlineAPI.getCollection(`fields/general`, 'fields')

    
    // let initialTemplate = await onlineAPI.service('template/initial', 'post', 'template', {
    //     domain: 'april-garant.bitrix24.ru',
    //     type: 'offer',
    //     name: 'Тестовое КП для Клиента'
    // })
    // let templateId = initialTemplate && initialTemplate.id
    
    //@ts-ignore
    // let fieldsGeneralIds = fieldsGeneral?.map(f => f.id)
    // let newTemplate = await onlineAPI.service('template/set', 'post', 'template', {
    //     templateId,
    //     fieldIds: fieldsGeneralIds
    // })


   
    

    // let deleteTemplate = await onlineAPI.service(`template/${templateId}`, 'delete', 'templates', {
    //     templateId,
    //     fieldIds: fieldsGeneralIds
    // })
    // let delete5Template = await onlineAPI.service(`template/${templateId}`, 'delete', 'templates', {
    //     templateId: 5,
    //     fieldIds: fieldsGeneralIds
    // })

    
    ////////////////////////////////




    await dispatch(getAuthApp())
    dispatch(initialActions.initializedSuccess())
    //FROM DIALOGS REDUCER -> get Dialogs
    // dispatch(getDialogs())
    dispatch(inProgress(false, PreloaderCodesEnum.Global))//inProgress-status
    // await  generalAPI.clientFieldGenerate()


    

}


//REDUCER
const appReducer = (state: AppStateType = initialState, action: InitialActionType): AppStateType => {

    switch (action.type) {
        case 'SP/APP/INITIALIZED_SUCCES': return { ...state, initialized: true }
        default: return state
    }

}



export default appReducer