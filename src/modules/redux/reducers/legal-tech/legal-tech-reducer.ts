
import { generalAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { LegalTechFilterEnum, LegalTechType } from "../../../types/types"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type LtStateType = typeof initialState
type LtActionsTypes = InferActionsTypes<typeof ltActions>
type GetStateType = () => AppStateType


const initialState = {

    packages: [] as Array<LegalTechType>,
    services: [] as Array<LegalTechType>,
    filtredLt: [] as Array<LegalTechType>,
    filter: {
        filters: [LegalTechFilterEnum.Packages, LegalTechFilterEnum.Services] as Array<LegalTechFilterEnum>,
        current: LegalTechFilterEnum.Services as LegalTechFilterEnum,
        index: 0 as 0 | 1
    }

}



//AC
export const ltActions = {
    setLt: (packages: Array<LegalTechType>, services: Array<LegalTechType>) => ({ type: 'lt/SET_LT', packages, services } as const),
    setFilter: (filterIndex: number) => ({ type: 'lt/SET_FILTER', filterIndex } as const)

}



//THUNK
export const updateLT = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)
    
    if (fetchedData && fetchedData.legalTech) {
        
        const lt = fetchedData.legalTech

        if (lt.packages && lt.services) {
            
            let packages: Array<LegalTechType> = lt.packages
            let services: Array<LegalTechType> = lt.services
            let lTpostData = [...packages, ...services]
            
            let savedLt = await generalAPI.setCollection('legalTech', lTpostData)
            
            dispatch(ltActions.setLt(packages, services))
        }

    }

    dispatch(inProgress(false, 'component'))

}

export const getLt = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let legalTech = await generalAPI.getCollection('legalTech')
    
    if (legalTech && legalTech.length > 0) {

        const packages = legalTech.filter(lt => lt.type === 'package')
        const services = legalTech.filter(lt => lt.type === 'lt')
        
        dispatch(ltActions.setLt(packages, services))



    }

    dispatch(inProgress(false, 'component'))

}

const legalTech = (state: LtStateType = initialState, action: LtActionsTypes) => {

    switch (action.type) {

        case 'lt/SET_LT':

            
            let currentLt = [] as Array<LegalTechType>


            if (state.filter.current === LegalTechFilterEnum.Packages) {
                
                currentLt = [...action.packages]
            } else if (state.filter.current === LegalTechFilterEnum.Services) {
                
                currentLt = [...action.services]
            }
            
            return {
                ...state,
                packages: action.packages,
                services: action.services,
                filtredLt: currentLt

            }

        case 'lt/SET_FILTER':
            let filtredLt = [] as Array<LegalTechType>


            if (state.filter.filters[action.filterIndex] === LegalTechFilterEnum.Packages) {
                filtredLt = [...state.packages]
            } else if (state.filter.filters[action.filterIndex] === LegalTechFilterEnum.Services) {
                filtredLt = [...state.services]
            }
            return {
                ...state,
                filter: {
                    ...state.filter,
                    current: state.filter.filters[action.filterIndex],
                    index: action.filterIndex
                },
                filtredLt

            };

        default:
            return state
    }


}

export default legalTech