import { generalAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { inProgress } from "../preloader/preloader-reducer"
import { getRegions, regionActions } from "../region/region-reducer"



const initialState = {
    coefficients: [1.25, 1.5, 2, 3, 4, 5, 6, 7],
    prices: {
        prof: [],
        universal: [],
    },

    filtred: [],
    filter: {
        filters: ['All', 'Prof', 'Universal'],
        current: 'All',
        index: 0,
        regions: ['msk', 'stv'],
    }

}



//A

const SET_PRICES = 'price/SET_PRICES'
const SET_FILTER = 'price/SET_FILTER'

//AC
export const setFilter = (filterIndex) => ({ type: SET_FILTER, filterIndex })
const setPrices = (prices) => ({ type: SET_PRICES, prices })


//THUNK

export const updatePrices = (token = null) => async (dispatch, getState) => {

    
    dispatch(inProgress(true, 'component'))
    const fetchedPrices = await googleAPI.get(token)

    if (fetchedPrices && fetchedPrices.prices) {
        
        if (fetchedPrices.prices.prof && fetchedPrices.prices.prof.length > 0 && fetchedPrices.prices.universal) {
            dispatch(setPrices(fetchedPrices.prices))
            const state = getState()
            const pricesProf = state.price.prices.prof
            const pricesUniversal = state.price.prices.universal
            
            const newProf = await generalAPI.setCollection('prof', pricesProf)
            const newUniversal = await generalAPI.setCollection('universal', pricesUniversal)

            
        }



        if (fetchedPrices.prices.regions && fetchedPrices.prices.regions.length > 0) {
            let regions = fetchedPrices.prices.regions
            let updatedregions = await generalAPI.setCollection('regions', regions)
            
            dispatch(regionActions.setRegions(regions))
        }


    }


    dispatch(inProgress(false, 'component'))
}

export const getPrices = () => async (dispatch, getState) => {


    dispatch(inProgress(true, 'component'))


    const fetchedProf = await generalAPI.getCollection('prof')
    const fetchedUniversal = await generalAPI.getCollection('universal')


    if (fetchedProf && fetchedUniversal && fetchedProf.length > 0 && fetchedUniversal.length > 0) {
        let prices = {
            prof: fetchedProf,
            universal: fetchedUniversal,
        }

        dispatch(setPrices(prices))
    }

    dispatch(getRegions())




    dispatch(inProgress(false, 'component'))
}





const price = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRICES:


            debugger
            return {
                ...state,
                prices: {
                    ...state.prices,
                    prof: action.prices.prof,
                    universal: action.prices.universal,

                },
                filtred: action.prices.universal.filter(price => state.filter.regions.includes(price.region) ),
                filter: {
                    filters: ['All', 'Prof', 'Universal'],
                    current: 'All',
                    regions: ['msk', 'stv'],
                    index: 0
                }
            }

        default:
            return state
    }

}

export default price