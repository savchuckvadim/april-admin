import { updatePlacements } from "../../../services/api-laravel"



const initialState = {
    actions: [
        {
            name: 'update client',
            type: 'client'
        },
        {
            name: 'update public',
            type: 'public'
        },
        {
            name: 'update test',
            type: 'test'
        },
        {
            name: 'update dev',
            type: 'dev'
        },
    ]

}



export const settingAction = (type) => async (dispatch, getState) => {

    // type as 'client' | 'test' | 'dev'

    let settingRes = await updatePlacements(type)


}

const settings = (state = initialState, action) => {

    switch (action.type) {


        default:
            return state

    }
}

export default settings