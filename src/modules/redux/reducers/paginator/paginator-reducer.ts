import { InferActionsTypes } from "../../store"

// TYPES
export type PaginatorStateType = typeof initialState
export type PaginatorActionsTypes = InferActionsTypes<typeof paginatorsActions>

// STATE
const initialState = {
    pageSize: 21 as number,
    totalItemsCount: 1 as number,
    currentPage: 1 as number,
    portionSize: 10 as number,
    currentPortion: 1 as number

}


//ACTION CREATORS
export const paginatorsActions = {
    setCurrentPage: (page: number, portion: number) => ({ type: 'SP/PAGINATOR/SET_CURRENT_PAGE', page, portion } as const),
    setTotalItemsCount: (count: number) => ({ type: 'SP/PAGINATOR/SET_TOTAL_ITEMS_COUNT', count } as const)
}




//THUNKS
//...

//REDUCER
const paginatorReducer = (state: PaginatorStateType = initialState, action: PaginatorActionsTypes): PaginatorStateType => {
    let result = state

    switch (action.type) {
        case "SP/PAGINATOR/SET_CURRENT_PAGE":
            result = { ...state }
            result.currentPage = action.page
            result.currentPortion = action.portion
            return result

        case "SP/PAGINATOR/SET_TOTAL_ITEMS_COUNT":
            result = { ...state }
            result.totalItemsCount = action.count
            return result

        default:
            return result

    }

}
export default paginatorReducer