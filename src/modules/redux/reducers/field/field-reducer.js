import { clientAPI, fieldsAPI, generalAPI } from "../../../services/firebase-api/firebase-api"
import { googleAPI } from "../../../services/google-api/google-api"
import { getFiltredFields } from "../../../utils/for-rdeucers/filter-utils"
import { inProgress } from "../preloader/preloader-reducer"

const initialState = {
    fields: [],
    filtredFields: [],
    filter: {
        filters: ['All', 'Global', 'Client'],
        current: 'All',
        index: 0
    }

}

//A
const SET_FIELDS = 'SET_FIELDS'
const SET_FILTER = 'SET_FILTER'
const SET_UPDATED_FIELD = 'SET_UPDATED_FIELD'



//AC
const setFields = (fields) => ({ type: SET_FIELDS, fields })
export const setFilter = (filterIndex) => ({ type: SET_FILTER, filterIndex })
const setUpdatedField = (fieldNumber, bitrixId, value) => ({ type: SET_UPDATED_FIELD, fieldNumber, bitrixId, value })



//THUNK
export const updateFields = (token = null) => async (dispatch, getState) => {
    dispatch(inProgress(true, 'component'))
    const fetchedFields = await googleAPI.get(token)
    let data
debugger
    if (fetchedFields.bitrix) {
        data = fetchedFields.bitrix
    }
    let fields = []

    for (const key in data) {
        data[key].map(field => {
            fields.push(field)
        })
    }


    if (fields) {
        dispatch(setFields(fields))
        await generalAPI.setCollection('fields', fields)
    }

    dispatch(inProgress(false, 'component'))

}


export const updateField = (fieldNumber, value, type) => async (dispatch, getState) => {
    dispatch(inProgress(true, 'page'))
    const fields = getState().field.fields
    debugger
    const resultFields = fields.map(field => {
        
        if(field.number === fieldNumber){
            
            return {...field, [`${type}`] : value}

        }
        
        return field
    })
    
    dispatch(setFields(resultFields))
    // await fieldsAPI.setFields(fields)

   let updatedFields = await fieldsAPI.updateField(fieldNumber, value, type, null)
    
    dispatch(inProgress(false, 'page'))
}



export const getFields = () => async (dispatch, getState) => {
    const fields = await fieldsAPI.getFields()
    dispatch(setFields(fields))

}



const field = (state = initialState, action) => {

    switch (action.type) {

        case SET_FIELDS:

            return {
                ...state,
                fields: action.fields,
                filtredFields: getFiltredFields(state.filter.current, action.fields)
            };

        case SET_FILTER:
            
            let test = getFiltredFields(state.filter.filters[action.filterIndex], state.fields)
            debugger
            return {
                ...state,
                filter: {
                    ...state.filter,
                    current: state.filter.filters[action.filterIndex],
                    index: action.filterIndex
                },
                filtredFields: getFiltredFields(state.filter.filters[action.filterIndex], state.fields)

            };

        case SET_UPDATED_FIELD:
        // fieldNumber, bitrixId, value




        default:
            return state;
    }
}

export default field