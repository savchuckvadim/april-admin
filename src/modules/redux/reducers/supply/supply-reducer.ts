import { supplyAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ComplectType, SupplyFilterEnum, SupplyType } from "../../../types/types"
import { getFiltred } from "../../../utils/for-rdeucers/filter-utils"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type SupplyStateType = typeof initialState
type SupplyActionsTypes = InferActionsTypes<typeof supplyActions>
type GetStateType = () => AppStateType


const initialState = {

    supplies: [] as Array<SupplyType>,
    filtredSupplies: [] as Array<ComplectType>,
    filter: {
        filters: ['All', 'Proxima', 'Internet'] as Array<SupplyFilterEnum>,
        current: 'All' as SupplyFilterEnum,
        index: 0 as 0 | 1 | 2
    }
}



//AC
export const supplyActions = {
    setSupplies: (supplies: Array<SupplyType>) => ({ type: 'supply/SET_SUPPLIES', supplies } as const),
    setFilter: (filterIndex: number) => ({ type: 'supply/SET_FILTER', filterIndex } as const)

}



//THUNK
export const updateSupplies = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)

    if (fetchedData && fetchedData.supplies) {
        let supplies: Array<SupplyType> = fetchedData.supplies

        let savedSupplies = await supplyAPI.setSupplies(supplies)

        let coefficients = supplies.map(s => ({ number: s.number, value: s.coefficient }))
        // await generalAPI.setCollection('coefficients', coefficients)
      
        dispatch(supplyActions.setSupplies(supplies))
    }

    dispatch(inProgress(false, 'component'))

}

export const getSupplies = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let supplies = await supplyAPI.getSupplies()

    if (supplies) {
        dispatch(supplyActions.setSupplies(supplies))
    }

    dispatch(inProgress(false, 'component'))

}

const supply = (state: SupplyStateType = initialState, action: SupplyActionsTypes) => {

    switch (action.type) {

        case 'supply/SET_SUPPLIES':

            return {
                ...state,
                supplies: action.supplies,
                filtredSupplies: getFiltred(state.filter.current, action.supplies, 'supply')
            }


        case 'supply/SET_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    current: state.filter.filters[action.filterIndex],
                    index: action.filterIndex
                },
                filtredSupplies: getFiltred(state.filter.current, state.supplies, 'supply')

            };


        default:
            return state
    }


}

export default supply