import { complectsAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ComplectFilterEnum, ComplectType } from "../../../types/types"
import { getFiltred } from "../../../utils/for-rdeucers/filter-utils"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type ComplectStateType = typeof initialState
type ComplectActionsTypes = InferActionsTypes<typeof complectActions>
type GetStateType = () => AppStateType


const initialState = {
    //prices
    // coefficients: [] as Array<number>,
    // universal: [] as Array<number>,
    // prof: {
    //     msk: {
    //         internet: [[]] as Array<Array<number>>,
    //         proxima: [[]] as Array<Array<number>>
    //     },
    //     regions: {
    //         internet: [[]] as Array<Array<number>>,
    //         proxima: [[]] as Array<Array<number>>
    //     },
    // },
    complects: [] as Array<ComplectType>,
    filtredComplects: [] as Array<ComplectType>,
    filter: {
        filters: ['All', 'Prof', 'Universal'] as Array<ComplectFilterEnum>,
        current: 'All' as ComplectFilterEnum,
        index: 0 as 0 | 1 | 2
    }
}



//AC
export const complectActions = {
    setComplects: (complects: Array<ComplectType>) => ({ type: 'complect/SET_COMPLECTS', complects } as const),
    setFilter: (filterIndex: number) => ({ type: 'complect/SET_FILTER', filterIndex } as const)

}



//THUNK
export const updateComplects = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    

    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)

    if (fetchedData && fetchedData.complects) {
        let complects: Array<ComplectType> = fetchedData.complects
        
        let savedComplects = await complectsAPI.setComplects(complects)
        
        dispatch(complectActions.setComplects(complects))
    }

    dispatch(inProgress(false, 'component'))

}

export const getComplects = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let complects = await complectsAPI.getComplects()

    if (complects) {
        dispatch(complectActions.setComplects(complects))
    }

    dispatch(inProgress(false, 'component'))

}

const complect = (state: ComplectStateType = initialState, action: ComplectActionsTypes) => {
    switch (action.type) {
        case 'complect/SET_COMPLECTS':

            return {
                ...state,
                complects: action.complects,
                filtredComplects: getFiltred(state.filter.current, action.complects, 'complect')
            }
        case 'complect/SET_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    current: state.filter.filters[action.filterIndex],
                    index: action.filterIndex
                },
                filtredComplects: getFiltred(state.filter.filters[action.filterIndex], state.complects, 'complect')

            };


        default:
            return state
    }


}

export default complect