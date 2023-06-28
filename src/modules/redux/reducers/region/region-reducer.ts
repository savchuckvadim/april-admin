import { regionAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ComplectFilterEnum, ComplectType, RegionType } from "../../../types/types"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type RegionStateType = typeof initialState
type RegionActionsTypes = InferActionsTypes<typeof regionActions>
type GetStateType = () => AppStateType


const initialState = {
    
    regions: [] as Array<RegionType>,
}



//AC
export const regionActions = {
    setRegions: (regions: Array<RegionType>) => ({ type: 'complect/SET_REGIONS', regions } as const),

}



//THUNK
export const updateRegions = (token = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    

    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)

    if (fetchedData && fetchedData.regions) {
        let regions: Array<RegionType> = fetchedData.regions
        

        let savedRegions = await regionAPI.setRegions(regions)
        
        dispatch(regionActions.setRegions(regions))
    }

    dispatch(inProgress(false, 'component'))

}

export const getRegions = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    dispatch(inProgress(true, 'component'))

    let regions = await regionAPI.getRegions()

    if (regions) {
        dispatch(regionActions.setRegions(regions))
    }

    dispatch(inProgress(false, 'component'))

}

const region = (state: RegionStateType = initialState, action: RegionActionsTypes) => {
    switch (action.type) {
        case 'complect/SET_REGIONS':

            return {
                ...state,
                regions: action.regions,
              
            }
      


        default:
            return state
    }


}

export default region