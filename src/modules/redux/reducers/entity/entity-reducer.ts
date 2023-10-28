import { onlineAPI } from "../../../services/april-online-api/online-api"
import { generalAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { ConsaltingType, SupplyType } from "../../../types/types"
import { tfieldsSetToFirebase } from "../../../utils/service-utils/service-utils"
import { AppDispatchType, AppStateType, InferActionsTypes } from "../../store"
import { inProgress } from "../preloader/preloader-reducer"


type EntityStateType = typeof initialState
type EntityActionsTypes = InferActionsTypes<typeof entityActions>
type GetStateType = () => AppStateType


const initialState = {

    items: [] as Array<SupplyType>,
    type: null,
    current: null,
    fields: [],


}



//AC
export const entityActions = {
    setEntityItems: (items: Array<ConsaltingType>) => ({ type: 'entity/SET_ENTITIES', items } as const),
}



//THUNK
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
            debugger
            onlineSavedData = await onlineAPI.setCollection(entityName, data)
            debugger



        } else {
            savedfireData = await generalAPI.setCollection(entityName, data)
            onlineSavedData = await onlineAPI.setCollection(entityName, data)
            debugger
        }


        dispatch(entityActions.setEntityItems(data))
    }

    dispatch(inProgress(false, 'component'))

}

export const getEntityItems = (entityName: string) => async (dispatch: AppDispatchType, getState: GetStateType) => {
    

    dispatch(inProgress(true, 'component'))

    let entityItems = await generalAPI.getCollection(entityName)

    if (entityItems) {
        debugger
        dispatch(entityActions.setEntityItems(entityItems))
    }
    debugger
    dispatch(inProgress(false, 'component'))

}

const entity = (state: EntityStateType = initialState, action: EntityActionsTypes) => {

    switch (action.type) {

        case 'entity/SET_ENTITIES':
            debugger
            return {
                ...state,
                items: action.items,

            }



        default:
            return state
    }


}

export default entity