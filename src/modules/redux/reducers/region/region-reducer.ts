import { regionAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ClientRegionType, ComplectFilterEnum, ComplectType, RegionType } from "../../../types/types"
import { getFiltredRegions } from "../../../utils/for-rdeucers/filter-utils"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { ClientStateType } from "../client/client-reducer"
import { inProgress } from "../preloader/preloader-reducer"


type RegionStateType = typeof initialState
type RegionActionsTypes = InferActionsTypes<typeof regionActions>
type GetStateType = () => AppStateType

export enum RegionsFilterEnum {
    All = 'All',
    Client = 'Client'
}

const initialState = {

    regions: [] as Array<RegionType>,
    filtredRegions: [] as Array<RegionType>,
    filter: {
        filters: ['All', 'Client'] as Array<RegionsFilterEnum>,
        current: 'All' as RegionsFilterEnum,
        index: 0 as 0 | 1
    }
}



//AC
export const regionActions = {
    setRegions: (regions: Array<RegionType>) => ({ type: 'region/SET_REGIONS', regions } as const),
    setFilter: (filters: Array<ClientRegionType>, filterIndex: number) => ({ type: 'region/SET_FILTER', filters, filterIndex } as const),

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
    regions = regions.map(region => ({ ...region, checked: true }))

    if (regions) {
        dispatch(regionActions.setRegions(regions))
    }

    dispatch(inProgress(false, 'component'))

}

export const getFilter = (filterIndex: number) => (dispatch: AppDispatchType, getState: GetStateType) => {


    const state = getState()
    const region = state.region as RegionStateType
    // if (region.filter.filters[filterIndex] === RegionsFilterEnum.Client) {//отфильтровать клиентские регионы

    // }
    const client = state.client as ClientStateType

    if (client) {
        const currentClient = client.current
        if (currentClient && currentClient.regions && Array.isArray(currentClient.regions)) {
            dispatch(regionActions.setFilter(currentClient.regions, filterIndex))

        } else {
            dispatch(regionActions.setFilter([], filterIndex))
        }

    }
    if (!client || region.filter.filters[filterIndex] !== RegionsFilterEnum.Client) {
        dispatch(regionActions.setFilter([], filterIndex))
    }

    //if index !== current => 
}


const region = (state: RegionStateType = initialState, action: RegionActionsTypes) => {
    switch (action.type) {
        case 'region/SET_REGIONS':

            return {
                ...state,
                regions: action.regions,
                filtredRegions: action.regions,
                filter: {
                    filters: ['All', 'Client'] as Array<RegionsFilterEnum>,
                    current: 'All' as RegionsFilterEnum,
                    index: 0 as 0 | 1
                }

            }

        case 'region/SET_FILTER':
            const filtredIndexes = action.filters.map(f => f.number)
            const filtredRegions = getFiltredRegions(filtredIndexes, state.regions)
            if (action.filterIndex === state.filter.index) {
                return state
            }
            return {
                ...state,

                filtredRegions: filtredRegions,
                filter: {
                    ...state.filter,
                    current: state.filter.filters[action.filterIndex],
                    index: action.filterIndex
                }

            }


        default:
            return state
    }


}

export default region