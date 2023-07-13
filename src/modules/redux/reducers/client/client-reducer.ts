import { ResultCodesEnum } from './../../../services/api-laravel';
import { ClientType, ContractType, FieldType, FieldsFilterEnum, ProductType } from './../../../types/types';
import { clientAPI, fieldsAPI, generalAPI } from "../../../services/firebase-api/firebase-api"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { getFiltredFields } from '../../../utils/for-rdeucers/filter-utils';
import { inProgress } from '../preloader/preloader-reducer';


export type ClientStateType = typeof initialState
type ClientActionsTypes = InferActionsTypes<typeof clientActions>
type GetStateType = () => AppStateType

const initialState = {
    clients: [] as Array<ClientType>,
    current: null as ClientType | null,
    // created: null as number | null,
    redirect: null as number | null,
    error: null


}



//ACTION CREATORS


export const clientActions = {

    setCurrentClient: (client: ClientType) => ({ type: 'clients/SET_CURRENT_CLIENT', client } as const),
    setRedirect: (clientId: number) => ({ type: 'clients/SET_REDIRECT', clientId } as const),
    deleteRedirect: () => ({ type: 'clients/DELETE_REDIRECT' } as const),
    setClients: (clients: Array<ClientType>) => ({ type: 'clients/SET_CLIENTS', clients } as const),
    setClientField: (field: FieldType, clientId: number) => ({ type: 'clients/SET_FIELD', field, clientId } as const),
    setClientProducts: (products: Array<ProductType>, clientId: number) => ({ type: 'clients/SET_PRODUCTS', products, clientId } as const),
    setRegion: (regions: Array<number>) => ({ type: 'clients/SET_REGION', regions } as const),
    setError: (errorMessage: string) => ({ type: 'clients/SET_ERROR', errorMessage } as const),
}


//THUNK

export const sendNewClient = (name: string, email: string, domain: string, placementKey: string, hookKey: string) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    dispatch(inProgress(true, 'component'))
    const clientData = await clientAPI.create(name, email, domain, placementKey, hookKey) as { resultCode: ResultCodesEnum, message?: string, client?: ClientType }
    debugger
    if (clientData && clientData.resultCode === ResultCodesEnum.Success && clientData.client) {
        if (clientData.client && clientData.client.number) {
            dispatch(clientActions.setCurrentClient(clientData.client))
            dispatch(clientActions.setRedirect(clientData.client.number))
        } else {
            console.log('something wrong with new client')
            console.log(clientData.client)
        }

    } else {
        clientData.message && console.log(clientData.message)
        clientData.message ? dispatch(clientActions.setError(clientData.message)) : dispatch(clientActions.setError('something wrong with creating client'))
    }

    dispatch(inProgress(false, 'component'))

}

export const setCreatingClient = () => async (dispatch: AppDispatchType, getState: GetStateType) => {


    let fetchedFields = await fieldsAPI.getFields() as Array<FieldType>
    if (fetchedFields.length > 0) {

        let fields: Array<FieldType> = getFiltredFields(FieldsFilterEnum.Client, fetchedFields)

        let defaultClient = {
            name: null,
            email: null,
            domain: null,
            number: null,
            key: null,
            hook: null,
            contracts: {
                items: [] as Array<ContractType>,
                current: [] as Array<number>,
                bitrixId: null as string | null
            },
            fields,
            products: null
        }

        dispatch(clientActions.setCurrentClient(defaultClient))
    }
}

export const getClients = () => async (dispatch: AppDispatchType, getState: GetStateType) => {
    let clients = await clientAPI.getClients()
    dispatch(clientActions.setClients(clients))
}

export const getClient = (clientId: number) => async (dispatch: AppDispatchType, getState: GetStateType) => {

    const state = getState().client as ClientStateType
    const clients = state.clients as Array<ClientType>

    let client = clients.find(client => client.number === clientId) as ClientType | undefined

    if (!client) {
        client = await clientAPI.getClient(clientId)

    }
    if (client !== undefined) {
        dispatch(clientActions.setCurrentClient(client))
    }

}

export const updateClientField = (fieldNumber: number, value: string, type: 'bitrixId' | 'value') => async (dispatch: AppDispatchType, getState: GetStateType) => {
    dispatch(inProgress(true, 'page'))

    const state = getState()
    const client = state.client as ClientStateType
    if (state && client && client.current) {
        const currentClient = client.current as ClientType
        let fields = currentClient.fields
        let clientId = currentClient.number && currentClient.number

        let resultFields = fields && fields.filter(field => {

            if (field.number === fieldNumber) {
                console.log('{ ...field, [`${type}`]: value }')
                console.log({ ...field, [`${type}`]: value })
                debugger
                return { ...field, [`${type}`]: value }
            }
        }) as Array<FieldType>


        let updateField = resultFields[0] as FieldType

        updateField[`${type}`] = value





        updateField && clientId && dispatch(clientActions.setClientField(updateField, clientId))

    }


    let updatedState = getState()
    const updatedClient = updatedState.client as ClientStateType
    if (updatedState && updatedClient && updatedClient.current) {
        const newCurrentClient = updatedClient.current as ClientType
        const fields: Array<FieldType> = newCurrentClient && newCurrentClient.fields

        // dispatch(inProgress(false, 'page'))
        console.log(' let updatedFields = await clientAPI.updateFields(fields,')
        console.log(fields)
        let updatedFields = await clientAPI.updateFields(fields, newCurrentClient.number)
        debugger

    }


}

export const getProducts = (clientId: number) => async (dispatch: AppDispatchType, getState: GetStateType) => {

    let products = await clientAPI.getProducts(clientId)
    dispatch(clientActions.setClientProducts(products, clientId))

}

export const updateClientRegions = (regionId: number, checked: boolean) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    debugger
    const state = getState()
    const client = state.client as ClientStateType
    if (client.current) {
        let newRegions = [] as Array<number>

        dispatch(inProgress(true, 'component'))
        let currentRegions = client.current.regions

        if (currentRegions && Array.isArray(currentRegions)) { //если у пользователя есть регоины и это массив
            if (checked) { //надо деактивировать
                newRegions = currentRegions.filter(region => region != regionId)

            } else { //надо активировать
                newRegions = currentRegions.filter(region => region != regionId)
                newRegions.push(regionId)
            }
        } else {
            if (!checked) { //надо активировать
                newRegions = [regionId]

            }
        }






        dispatch(clientActions.setRegion(newRegions))

        await generalAPI.updateProp('clients', client.current.number, newRegions, 'regions')

        dispatch(inProgress(false, 'component'))
    }




}




//REDUCER
const client = (state: ClientStateType = initialState, action: ClientActionsTypes) => {

    switch (action.type) {
        case 'clients/SET_CURRENT_CLIENT':

            return {
                ...state,
                current: action.client
            }

        case 'clients/SET_CLIENTS':

            return {
                ...state,
                clients: action.clients
            }

        case 'clients/SET_REDIRECT':

            return {
                ...state,
                redirect: action.clientId
            }


        case 'clients/DELETE_REDIRECT':

            return {
                ...state,
                redirect: null
            }

        case 'clients/SET_FIELD':

            const resultFields = state.current && state.current.fields.map(field => {

                if (field.number === action.field.number) {
                    return action.field
                }
                return field
            }) as Array<FieldType>

            const updatedClients = state.clients.map(client => {
                return client.number !== action.clientId
                    ? client
                    : { ...client, fields: resultFields }

            })
            let searchingUpdate = resultFields !== null && resultFields.find(field => field.number === action.field.number)
            console.log(searchingUpdate)
            debugger
            debugger
            return {
                ...state,
                clients: updatedClients,
                current: {
                    ...state.current,
                    fields: resultFields
                }
            }
        case 'clients/SET_PRODUCTS':



            const clientsWithUpdateProducts = state.clients.map(client => {
                return client.number !== action.clientId
                    ? client
                    : { ...client, products: action.products }

            })

            console.log(action.products)
            debugger

            return {
                ...state,
                clients: clientsWithUpdateProducts,
                current: {
                    ...state.current,
                    products: action.products
                }
            }

        case 'clients/SET_REGION':

            const current = { ...state.current }
            current.regions = action.regions
            return {
                ...state,
                current: current
            }

        case 'clients/SET_ERROR':

            return {
                ...state,
                redirect: action.errorMessage,
                error: action.errorMessage
            }


        default:
            return state;
    }
}

export default client 