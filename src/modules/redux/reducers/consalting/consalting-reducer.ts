import {  consaltingAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ConsaltingType, SupplyType } from "../../../types/types"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type ConsaltingStateType = typeof initialState
type ConsaltingActionsTypes = InferActionsTypes<typeof consaltingActions>
type GetStateType = () => AppStateType


const initialState = {
   
    consalting: [] as Array<SupplyType>,
   
}



//AC
export const consaltingActions = {
    setConsalting: (consalting: Array<ConsaltingType>) => ({ type: 'consalting/SET_CONSALTING', consalting } as const),
   

}



//THUNK
export const updateConsalting = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    

    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)

    if (fetchedData && fetchedData.consalting) {
        let consalting: Array<ConsaltingType> = fetchedData.consalting
        
        let savedConsalting = await consaltingAPI.setConsalting(consalting)
        
        dispatch(consaltingActions.setConsalting(consalting))
    }

    dispatch(inProgress(false, 'component'))

}

export const getConsalting = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let consalting = await consaltingAPI.getConsalting()

    if (consalting) {
        dispatch(consaltingActions.setConsalting(consalting))
    }

    dispatch(inProgress(false, 'component'))

}

const consalting = (state: ConsaltingStateType = initialState, action: ConsaltingActionsTypes) => {

    switch (action.type) {

        case 'consalting/SET_CONSALTING':

            return {
                ...state,
                consalting: action.consalting,
               
            }


        
        default:
            return state
    }


}

export default consalting