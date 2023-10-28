import { updatePlacements } from "../../../services/api-laravel"



const initialState = {
    actions: [
        {
            name: 'update all'
        },
        {
            name: 'update test'
        },
    ]

}



export const settingAction = (name) => async (dispatch, getState) => {

    const state = getState()
    // const actions = state.settings.actions

    let isProd = name === 'update all'


    let settingRes = await updatePlacements(isProd)
    

}

const settings = (state = initialState, action) => {

    switch (action.type) {


        default:
            return state

    }
}

export default settings