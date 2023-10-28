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
    const deals = await  onlineAPI.getDeals('domain', 'alfacentr.bitrix24.ru') 
debugger
    /////////TEST PORTAL GET

    
    // let setportal = await onlineAPI.setPortal('april-dev.bitrix24.ru',
    //     'local.5c8bb1b0891cf2.87252039',
    //     'SakeVG5mbRdcQet45UUrt6q72AMTo7fkwXSO7Y5LYFYNCRsA6f',
    //     '3tbw4laz9lz3ad0a')
    let getportal = await onlineAPI.getPortal('april-dev.bitrix24.ru')
    let getportals = await onlineAPI.getPortals()
    debugger
    ////////////////////////////////

 


    await dispatch(getAuthApp())
    dispatch(initialActions.initializedSuccess())
    //FROM DIALOGS REDUCER -> get Dialogs
    // dispatch(getDialogs())
    dispatch(inProgress(false, PreloaderCodesEnum.Global))//inProgress-status
    // await  generalAPI.clientFieldGenerate()


    debugger

}


//REDUCER
const appReducer = (state: AppStateType = initialState, action: InitialActionType): AppStateType => {

    switch (action.type) {
        case 'SP/APP/INITIALIZED_SUCCES': return { ...state, initialized: true }
        default: return state
    }

}



export default appReducer