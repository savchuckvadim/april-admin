import { generalAPI, ltAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { inProgress } from "../preloader/preloader-reducer"
import { getRegions, regionActions } from "../region/region-reducer"



const initialState = {
    coefficients: [1.25, 1.5, 2, 3, 4, 5, 6, 7],
    prices: {
        prof: [],
        universal: [],
        lt: [],
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


    dispatch(inProgress(true, 'global'))
    const fetchedPrices = await googleAPI.get(token)

    if (fetchedPrices && fetchedPrices.prices) {

        if (fetchedPrices.prices.prof && fetchedPrices.prices.prof.length > 0 && fetchedPrices.prices.universal) {
            dispatch(setPrices(fetchedPrices.prices))
            const state = getState()
            const pricesProf = state.price.prices.prof
            const pricesUniversal = state.price.prices.universal
            const coefficients = state.price.prices.coefficients

            const newProf = await generalAPI.setCollection('prof', pricesProf)
            const newUniversal = await generalAPI.setCollection('universal', pricesUniversal)


        }



        if (fetchedPrices.regions && fetchedPrices.regions.length > 0) {
            let regions = fetchedPrices.regions
            let updatedregions = await generalAPI.setCollection('regions', regions)
            debugger
            dispatch(regionActions.setRegions(regions))
        }


        if (fetchedPrices.prices.lt && fetchedPrices.prices.lt.length > 0) {
            let lt = fetchedPrices.prices.lt
            let updatedLt = await ltAPI.updatePrices(lt)
            debugger
            //todo dispatch updated lt
        }


    }


    dispatch(inProgress(false, 'global'))
}

export const getPrices = () => async (dispatch, getState) => {


    dispatch(inProgress(true, 'component'))


    const fetchedProf = await generalAPI.getCollection('prof')
    const fetchedUniversal = await generalAPI.getCollection('universal')
    const fetchedLt = await generalAPI.getCollection('legalTech')

    if (fetchedProf && fetchedUniversal && fetchedLt && fetchedProf.length > 0 && fetchedUniversal.length > 0 && fetchedLt.length > 0) {
        let ltPrices = []
        fetchedLt.forEach(lt => {
            if (lt.type === 'package') {
                const mskPrice = {
                  number: Number(1 + '' + lt.number),
                  complectName: lt.title,
                  complectNumber: lt.number,
                  supplyNumber: false,
                  price: Number(lt.msk),
                  region: 1,  //0 - regions / 1 - msk
                  complectType: false   // 0 - internet 1 - proxima
                }
                const rgnPrice = {
                  number: Number(0 + '' + lt.number),
                  complectName: lt.title,
                  complectNumber: lt.number,
                  supplyNumber: false,
                  price: Number(lt.regions),
                  region: 0,  //0 - regions / 1 - msk
                  complectType: false   // 0 - internet 1 - proxima
                }
                ltPrices.push(mskPrice, rgnPrice)
          
              }
        })
        
        let prices = {
            prof: fetchedProf,
            universal: fetchedUniversal,
            lt:ltPrices
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
                    lt: action.prices.lt

                },
                filtred: action.prices.universal.filter(price => state.filter.regions.includes(price.region)),
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