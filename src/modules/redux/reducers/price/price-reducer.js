import { generalAPI, ltAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { inProgress } from "../preloader/preloader-reducer"
import { getRegions, regionActions } from "../region/region-reducer"
import { getSupplies } from "../supply/supply-reducer"



const initialState = {
    coefficients: [1, 1.1, 1.25, 1.5, 2, 3, 4, 5, 6, 7],
    prices: {
        prof: [],
        universal: [],
        lt: [],
        consalting: []
    },

    filtred: [],
    filter: {
        filters: ['All', 'Prof', 'Universal', 'Legal Tech', 'Consalting'],
        current: 'Universal',
        index: 0,
        regions: ['msk'],
        supply: [0,1, 10, 11, 12, 13, ],
        complectType: [0],  //0 - internet 1 - proxima +
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
//формируются цены гарант и сервисов

//TODO взять пришедшие цены и ими обновить сервисы типа поля msk regions  у lt и star
//пока я сделаю так что star вместо PriceType будет приходить StarServiceType и сразу пушиться в DB

    dispatch(inProgress(true, 'global'))
    const fetchedPrices = await googleAPI.get(token)

    if (fetchedPrices && fetchedPrices.prices) {

        if (fetchedPrices.prices.prof && fetchedPrices.prices.prof.length > 0 && fetchedPrices.prices.universal) {
            
            await generalAPI.setCollection('prof', fetchedPrices.prices.prof)
            await generalAPI.setCollection('universal', fetchedPrices.prices.universal)
           
            

        }

        if (fetchedPrices.prices.star && fetchedPrices.prices.star.length > 0) {
            
            await generalAPI.setCollection('star', fetchedPrices.prices.star)

        }

        
        if (fetchedPrices.regions && fetchedPrices.regions.length > 0) {
            let regions = fetchedPrices.regions
            await generalAPI.setCollection('regions', regions)

            dispatch(regionActions.setRegions(regions))
        }


        if (fetchedPrices.prices.lt && fetchedPrices.prices.lt.length > 0) {
            let lt = fetchedPrices.prices.lt
            await ltAPI.updatePrices(lt)

        }


    }

    dispatch(getPrices())
    dispatch(inProgress(false, 'global'))
}

export const getPrices = () => async (dispatch, getState) => {


    dispatch(inProgress(true, 'component'))
    await dispatch(getSupplies())

    let supplies = getState().supply.supplies
    const fetchedProf = await generalAPI.getCollection('prof')
    const fetchedUniversal = await generalAPI.getCollection('universal')
    const fetchedLt = await generalAPI.getCollection('legalTech')
    const fetchedConsalting = await generalAPI.getCollection('consalting')
    
    if (fetchedProf && fetchedUniversal && fetchedLt && fetchedProf.length > 0 && fetchedUniversal.length > 0 && fetchedLt.length > 0) {
        let prof = fetchedProf.map(profPrice => {
            let s = supplies.find(sup => sup.number === profPrice.supplyNumber)
            let supplyName = s && s.name
            return {
                ...profPrice,
                supplyName
            }
        })
        let universal = fetchedUniversal.map(un => {
            let s = supplies.find(sup => sup.number === un.supplyNumber)
            let supplyName = s && s.name
            return {
                ...un,
                supplyName
            }
        })
        let ltPrices = []
        let consaltingPrices = []
        fetchedLt.forEach(lt => {
            if (lt.type === 'package') {
                const mskPrice = {
                    number: Number(1 + '' + lt.number),
                    complectName: lt.name,
                    complectNumber: lt.number,
                    supplyNumber: false,
                    price: Number(lt.msk),
                    region: 1,  //0 - regions / 1 - msk
                    complectType: false ,  // 0 - internet 1 - proxima,
                    supplyName: false,
                }
                const rgnPrice = {
                    number: Number(0 + '' + lt.number),
                    complectName: lt.name,
                    complectNumber: lt.number,
                    supplyNumber: false,
                    price: Number(lt.regions),
                    region: 0,  //0 - regions / 1 - msk
                    complectType: false,   // 0 - internet 1 - proxima
                    supplyName: false,
                }
                ltPrices.push(mskPrice, rgnPrice)

            }
        })

        let count = 0
        for (const key in fetchedConsalting) {
            let consalting = fetchedConsalting[key]
            const price = {
                number: consalting.number,
                complectName: consalting.name,
                complectNumber: consalting.number,
                supplyNumber: false,
                price: false,
                region: 1,  //0 - regions / 1 - msk
                complectType: false,  // 0 - internet 1 - proxima
                isAbs: true,
                abs: consalting.abs,
                supplyName: false,
            }
            consaltingPrices.push(price)
            count++
        }



        let prices = {
            prof,
            universal,
            lt: ltPrices,
            consalting: consaltingPrices
        }
        
        dispatch(setPrices(prices))
    }

    dispatch(getRegions())




    dispatch(inProgress(false, 'component'))
}





const price = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRICES:
            let filtred = []

            
            for (const key in action.prices) {
                action.prices[key].forEach(price => {
                    filtred.push(price)
                })
            }

            return {
                ...state,
                prices: {
                    ...state.prices,
                    prof: action.prices.prof,
                    universal: action.prices.universal,
                    lt: action.prices.lt,
                    consalting: action.prices.consalting

                },
                filtred,
                filter: {
                    ...state.filter,
                    current: 'All',
                    regions: ['msk', 'stv'],
                    index: 0
                }
            }

        case SET_FILTER:
            let filtredPrices = []
            switch (action.filterIndex) {
                case 0: //All

                    for (const key in state.prices) {
                        state.prices[key].forEach(price => {
                            filtredPrices.push(price)
                        })
                    }
                    
                    return {
                        ...state,
                        filtred: filtredPrices
                    }

                case 1: //Prof

                    
                    state.prices.prof.map(price => {
                        if (state.filter.supply.includes(price.supplyNumber)) {
                            filtredPrices.push(price)
                        }
                        // filtredPrices.push(price)
                    })

                    return {
                        ...state,
                        filtred: filtredPrices
                    }

                case 2: //Universal

                    return {
                        ...state,
                        filtred: state.prices.universal.filter(price => state.filter.regions.includes(price.region)),
                    }
                case 3: //Legal Tech

                    return {
                        ...state,
                        filtred: state.prices.lt
                    }
                case 4: //Consalting

                    return {
                        ...state,
                        filtred: state.prices.consalting
                    }

                default:
                    return state
            }

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
                    ...state.filter,
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