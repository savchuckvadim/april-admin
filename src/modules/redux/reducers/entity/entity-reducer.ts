import { onlineAPI } from "../../../services/april-online-api/online-api"
import { generalAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { SetUpdatingTemplate, Template } from "../../../types/template-types"
import { ConsaltingType, SupplyType } from "../../../types/types"
import { tfieldsSetToFirebase } from "../../../utils/service-utils/service-utils"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"
import { Entity, EntityField, TemplateAddData, TemplateInitialAddData } from "../../../types/entity-types"
import { getDataForSetTField, getDataForSetTemplate, getInitialTemplateData, getInitialTemplateFieldData } from "../../../utils/for-rdeucers/template-utils"


type EntityStateType = typeof initialState
type EntityActionsTypes = InferActionsTypes<typeof entityActions>
type GetStateType = () => AppStateType


const initialState = {

    items: [] as Array<SupplyType>,
    type: null,
    current: null,
    fields: [],
    adding: {
        parameters: [],
        fields: [
            // {
            //     name: 'название шаблона',
            //     type: 'array',
            //     items: []
            // },
            // {
            //     name: 'название шаблона',
            //     type: 'array',
            //     items: []
            // },
        ]
    },

    isInitializingAdd: false


}



//AC
export const entityActions = {
    setEntityItems: (items: Array<ConsaltingType | Template>) => ({ type: 'entity/SET_ENTITIES', items } as const),
    // setInitializingAddProcess: () => ({ type: 'entity/SET_INITIALIZING_ADD' } as const),
    setInitialAdd: (initialData: TemplateAddData) => ({ type: 'entity/SET_INITIAL_ADD', initialData } as const)
}



//THUNK
//entities items
export const updateEntities = (token = null, entityName: string) => async (dispatch: AppDispatchType, getState: GetStateType) => {


    //получить из гугла массив entities и вставить в firebase и april-online
    
    dispatch(inProgress(true, 'component'))
    const fetchedData = await googleAPI.get(token)
    let savedfireData = null
    let onlineSavedData = null

    //@ts-ignore
    if (fetchedData && fetchedData[`${entityName}`]) {
        //@ts-ignore
        const data = fetchedData[`${entityName}`]

        if (entityName === 'tfields') {
            const firebasedata = tfieldsSetToFirebase(data.fields, data.items)
            savedfireData = await generalAPI.setCollection(entityName, firebasedata)

            onlineSavedData = await onlineAPI.setCollection(entityName, data)




        } else {
            savedfireData = await generalAPI.setCollection(entityName, data)
            onlineSavedData = await onlineAPI.setCollection(entityName, data)

        }


        dispatch(entityActions.setEntityItems(data))
    }

    dispatch(inProgress(false, 'component'))

}


export const getEntities = (url: string, method: string, collectionName: string, data: any = null) => async (dispatch: AppDispatchType, getState: GetStateType) => {

    if(url){
        const collection = await onlineAPI.getCollection(url, method, collectionName, data)

    
        if(collection){
            dispatch(entityActions.setEntityItems(collection))
        }else{
            console.log('no collection')
        }
    }else{
        console.log('no url')
    }
  
   
}

//entity
export const initialAddEntity = (entityName: string) => async (dispatch: AppDispatchType, getState: GetStateType) => {

    let initialData = {
        parameters: [],
        fields: []
    } as TemplateAddData


    switch (entityName) {
        case 'template':
            initialData = await getInitialTemplateData()
            dispatch(entityActions.setInitialAdd(initialData))
            break;


        case 'field':

            initialData = await getInitialTemplateFieldData()
            dispatch(entityActions.setInitialAdd(initialData))
            break;
        default:
            break;
    }

}

export const setUpdatingEntity = (url: string, model: string, values: Array<any>) => async (dispatch: AppDispatchType, getState: GetStateType) => {



    const state = getState() as AppStateType

    switch (model) {
        case 'template':
            const dataT = getDataForSetTemplate(state, values)
            await onlineAPI.service(url, 'post', model, dataT)
            break;


        case 'field':
            const dataTF = getDataForSetTField(values, 'templateId')
            await onlineAPI.service(url, 'post', model, dataTF)
            break;
        default:
            break;
    }





}



export const setNewEntity = (entity: Entity) => async (dispatch: AppDispatchType, getState: GetStateType) => { }


// export const getEntityItems = (entityName: string) => async (dispatch: AppDispatchType, getState: GetStateType) => {


//     dispatch(inProgress(true, 'component'))

//     let entityItems = await generalAPI.getCollection(entityName)

//     if (entityItems) {

//         dispatch(entityActions.setEntityItems(entityItems))
//     }

//     dispatch(inProgress(false, 'component'))

// }




const entity = (state: EntityStateType = initialState, action: EntityActionsTypes) => {

    switch (action.type) {

        case 'entity/SET_ENTITIES':

            return {
                ...state,
                items: action.items,

            }
        case 'entity/SET_INITIAL_ADD':

            const initialData = action.initialData

            return {
                ...state,
                adding: {
                    ...initialData
                },
                isInitializingAdd: true

            }

        // case 'entity/SET_INITIALIZING_ADD':
        //     
        //     return {
        //         ...state,
        //         adding: {
        //             id: null,
        //             name: '',
        //             domain: '',
        //             type: '',
        //             fields: [
        //                 {
        //                     name: 'name',
        //                     type: 'string',
        //                     value: null,
        //                     items: []
        //                 },
        //                 {
        //                     name: 'domain',
        //                     type: 'string',
        //                     value: null,
        //                     items: []
        //                 },
        //                 {
        //                     name: 'type',       //offer | invoice | contract
        //                     type: 'string',
        //                     value: null,
        //                     items: []
        //                 },

        //             ]
        //         },
        //         isInitializingAdd: true

        //     }


        default:
            return state
    }


}

export default entity