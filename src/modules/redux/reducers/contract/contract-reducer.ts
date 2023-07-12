import {  contractAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ContractType } from "../../../types/types"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type ContractStateType = typeof initialState
type ContractActionsTypes = InferActionsTypes<typeof contractActions>
type GetStateType = () => AppStateType


const initialState = {
   
    contracts: [] as Array<ContractType>,

   
}



//AC
export const contractActions = {
    setContracts: (contracts: Array<ContractType>) => ({ type: 'contract/SET_CONTRACTS', contracts } as const),
   

}



//THUNK
export const updateContracts = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    

    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)

    if (fetchedData && fetchedData.contracts) {
        let contracts: Array<ContractType> = fetchedData.contracts
        
        let savedContracts = await contractAPI.setContracts(contracts)
        
        dispatch(contractActions.setContracts(contracts))
    }

    dispatch(inProgress(false, 'component'))

}

export const getContracts = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let contracts = await contractAPI.getContracts()

    if (contracts) {
        dispatch(contractActions.setContracts(contracts))
    }

    dispatch(inProgress(false, 'component'))

}

const contract = (state: ContractStateType = initialState, action: ContractActionsTypes) => {

    switch (action.type) {

        case 'contract/SET_CONTRACTS':

            return {
                ...state,
                contracts: action.contracts,  
            }

        default:
            return state
    }


}

export default contract