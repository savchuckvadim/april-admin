import { clientAPI, complectsAPI, contractAPI, generalAPI, supplyAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ComplectTypesEnum, ContractAprilNameEnum, ProductTypesEnum, SupplyTypesEnum } from "../../../types/types"
import { inProgress } from "../preloader/preloader-reducer"



//todo 
//1. refresh products from Complect+Supply+Contract - if that was changed
//2. refressh client.products - from global products - не изменять при этом bitrix id , measureId и т.д
//при этом будут обновлены значения полей, добавлены новые
//наконец появятся новые products - админка должна сообщать - какие новые products с какими полями и значениями должны быть проимпортированы клиенту
//должна быть возможность получить exel со всеми global и clients - prodeucts




const initialState = {
    garant: null,
    consalting: null,
    legalTech: null,
    products: {
        all: null,
        filtred: null
    }
}

//A
const SET_PRODUCTS = 'SET_PRODUCTS'


//AC

const setProducts = (products) => ({ type: SET_PRODUCTS, products })


//THUNK
export const updateProducts = (token = null) => async (dispatch, getState) => {


    dispatch(inProgress(true, 'component'))
    const fetchedFields = await googleAPI.get(token)
    let data = fetchedFields


    let products = {}

    for (const key in data) {
        data[key].map(field => {
            products[key].push(field)
        })
    }


    if (products) {
        //todo
    }

    dispatch(inProgress(false, 'component'))

}

export const getProducts = () => async (dispatch, getState) => {

    let products = await generalAPI.getCollection('products')
    
    if (products && products.length > 0) {
        dispatch(setProducts(products))
    }

}

export const generateProducts = () => async (dispatch, getState) => {


    let complects = await generalAPI.getCollection('complects')
    let supplies = await generalAPI.getCollection('supplies')
    let contracts = await generalAPI.getCollection('contracts')
    let consalting = await generalAPI.getCollection('consalting')
    let legalTech = await generalAPI.getCollection('legalTech')

    
    let products = {
        garant: {

            prof: {
                abon: [],
                abonBig: [],
                internet: [],
                proxima: [],
            },

            universal: {
                internet: [],
                proxima: [],
            }
        },
        consalting: [],
        legalTech: []
    }
    let count = 0

    let postDataProducts = []
    let postDataConsalting = []
    let postDataLegalTech = []
    //garant
    complects.forEach(complect => {
        supplies.forEach(supply => {
            contracts.forEach(contract => {

                let contractConsaltingProp = ''
                let contractConsaltingComment = ''
                if (complect.withConsalting) {

                    contractConsaltingProp = consalting[1].contractProp
                    contractConsaltingComment = consalting[1].contractComment
                }

                let product = {
                    number: count,
                    name: `${complect.fullName}`,
                    productId: null,

                    type: ProductTypesEnum.Garant,


                    //from complect
                    complectNumber: complect.number,
                    complectName: complect.fullName,
                    withConsalting: complect.withConsalting,
                    complectType: complect.type,
                    abs: complect.abs,


                    //from supply
                    supplyNumber: supply.number,
                    supplyName: supply.name,
                    supplyType: supply.type,

                    contractSupplyName: supply.contractName,
                    contractSupplyProp1: supply.contractProp1,
                    contractSupplyProp2: supply.contractProp2,
                    contractSupplyPropComment: supply.contractPropComment,
                    contractSupplyPropEmail: supply.contractPropEmail,
                    contractSupplyPropLoginsQuantity: supply.contractPropLoginsQuantity,
                    contractSupplyPropSuppliesQuantity: supply.contractPropSuppliesQuantity,

                    //from contract
                    contractName: contract.aprilName,//aprilName
                    contractShortName: contract.shortName,
                    contractNumber: contract.number,
                    measureNumber: contract.measureNumber,
                    mesureFullName: contract.mesureFullName,
                    prepayment: contract.prepayment,
                    discount: contract.discount,


                    //from consalting
                    contractConsaltingProp,
                    contractConsaltingComment,

                    //other
                    withPrice: complect.type === ComplectTypesEnum.prof



                }
                if (complect.type === ComplectTypesEnum.prof) {

                    if (supply.type === SupplyTypesEnum.internet) {

                        //для комплета проф в интернет версии контракт может быть только
                        //ContractAprilNameEnum.Internet
                        //ContractAprilNameEnum.AbonHalf
                        //AbonYear
                        //лицензии пока не делаю

                        if (contract.aprilName === ContractAprilNameEnum.Internet) {
                            products.garant.prof.internet.push(product)
                            postDataProducts.push(product)
                            count++
                        } else if (contract.aprilName === ContractAprilNameEnum.AbonHalf) {
                            products.garant.prof.abon.push(product)
                            postDataProducts.push(product)
                            count++
                        } else if (contract.aprilName === ContractAprilNameEnum.AbonYear) {
                            products.garant.prof.abonBig.push(product)
                            postDataProducts.push(product)
                            count++
                        }


                    } else if (supply.type === SupplyTypesEnum.proxima) {

                        if (contract.aprilName === ContractAprilNameEnum.Service) {
                            products.garant.prof.proxima.push(product)
                            postDataProducts.push(product)
                            count++
                        }
                    }


                } else if (complect.type === ComplectTypesEnum.universal) {
                    if (supply.type === SupplyTypesEnum.internet) {


                        if (contract.aprilName === ContractAprilNameEnum.Internet) {
                            products.garant.universal.internet.push(product)
                            postDataProducts.push(product)
                            count++
                        }

                    } else if (supply.type === SupplyTypesEnum.proxima) {

                        if (contract.aprilName === ContractAprilNameEnum.Service) {
                            products.garant.universal.proxima.push(product)
                            postDataProducts.push(product)
                            count++
                        }
                    }
                }



            })
        })
    })
    await generalAPI.setCollection('products', postDataProducts)

    consalting.forEach(consalting => {

        contracts.forEach(contract => {


            let product = {
                number: count,
                name: `${consalting.name}`,
                productId: null,

                type: ProductTypesEnum.Consalting,


                //from complect
                complectNumber: consalting.number,
                complectName: consalting.title,
                withConsalting: true,
                complectType: 'consalting',
                abs: consalting.abs,

                //from supply
                supplyNumber: false,
                supplyName: '',
                supplyType: false,

                contractSupplyName: '',
                contractSupplyProp1: '',
                contractSupplyProp2: '',
                contractSupplyPropComment: '',
                contractSupplyPropEmail: '',
                contractSupplyPropLoginsQuantity: '',
                contractSupplyPropSuppliesQuantity: '',

                //from contract
                contractName: contract.aprilName,//aprilName
                contractShortName: contract.shortName,
                contractNumber: contract.number,
                measureNumber: contract.measureNumber,
                mesureFullName: contract.mesureFullName,
                prepayment: contract.prepayment,
                discount: 1,



                //from consalting
                contractConsaltingProp: consalting.contractProp,
                contractConsaltingComment: consalting.contractComment,

                //other
                withPrice: false


            }

            if (consalting.number !== 0) { //кроме горячей линии
                if (contract.aprilName === ContractAprilNameEnum.Internet) {

                    postDataConsalting.push(product)
                    count++
                } else if (contract.aprilName === ContractAprilNameEnum.AbonHalf) {

                    postDataConsalting.push(product)
                    count++
                } else if (contract.aprilName === ContractAprilNameEnum.AbonYear) {

                    postDataConsalting.push(product)
                    count++
                }
            }







        })
    })

    await generalAPI.setCollection('products', postDataConsalting)

    legalTech.forEach(lt => {
        contracts.forEach(contract => {


            let product = {
                number: count,
                name: `${lt.fullName}`,
                productId: null,

                type: ProductTypesEnum.LegalTech,


                //from lt
                complectNumber: lt.number,
                complectName: lt.fullName,
                withConsalting: false,
                complectType: 'legalTech',
                abs: false,

                //from supply
                supplyNumber: false,
                supplyName: '',
                supplyType: false,

                contractSupplyName: '',
                contractSupplyProp1: '',
                contractSupplyProp2: '',
                contractSupplyPropComment: '',
                contractSupplyPropEmail: '',
                contractSupplyPropLoginsQuantity: '',
                contractSupplyPropSuppliesQuantity: '',

                //from contract
                contractName: contract.aprilName,//aprilName
                contractShortName: contract.shortName,
                contractNumber: contract.number,
                measureNumber: contract.measureNumber,
                mesureFullName: contract.mesureFullName,
                prepayment: contract.prepayment,
                discount: 1,



                //from consalting
                contractConsaltingProp: '',
                contractConsaltingComment: '',

                //other
                withPrice: true


            }

            if (lt.type === 'package') {
                
                if (contract.aprilName === ContractAprilNameEnum.Internet) {

                    postDataLegalTech.push(product)
                    count++
                } else if (contract.aprilName === ContractAprilNameEnum.AbonHalf) {

                    postDataLegalTech.push(product)
                    count++
                } else if (contract.aprilName === ContractAprilNameEnum.AbonYear) {

                    postDataLegalTech.push(product)
                    count++
                }
            }


        })
    })

    await generalAPI.setCollection('products', postDataLegalTech)


    let fetchedProducts = await generalAPI.getCollection('products')
    let updatedClient = await clientAPI.updateClientsProducts(fetchedProducts)

    if (fetchedProducts) {
        dispatch(setProducts(fetchedProducts))
    }

}


export const updateClientProducts = (clientId) => async (dispatch, getState) => {



    let fetchedProducts = await generalAPI.getCollection('products')


    if (clientId && fetchedProducts) {
        await clientAPI.setProducts(clientId, fetchedProducts)
    }

}




const product = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            let garant = {
                prof: {
                    internet: [],
                    proxima: [],
                    abonHalf: [],
                    abonYear: [],

                },
                universal: {
                    internet: [],
                    proxima: [],
                    licHalf: [],
                    licYear: [],
                },
            }
            let consalting = {
                internet: [],
                abonHalf: [],
                abonYear: [],
            }

            let legalTech = {
                internet: [],
                abonHalf: [],
                abonYear: [],

            }
            action.products.forEach(product => {
                if (product.complectType === 'prof' || product.complectType === 'prof') {
                    
                    garant[product.complectType][product.contractShortName].push(product)
                } else if (product.complectType === 'legalTech') {
                    legalTech[product.contractShortName].push(product)
                } else if (product.complectType === 'consalting') {
                    consalting[product.contractShortName].push(product)
                }
                

            })


            return {
                ...state,
                garant,
                consalting,
                legalTech,
                products: {
                    all: action.products,
                    filtred: action.products
                }

            }


        default:
            return state
    }


}

export default product