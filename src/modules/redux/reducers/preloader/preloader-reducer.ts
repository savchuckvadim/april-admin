const IN_PROGRESS = 'IN_PROGRESS'

// const initialState = {
//     inProgress: false as boolean
// }

const initialState = {
    global: {
        inProgress: false as boolean
    },
    page: {
        inProgress: false as boolean
    },
    component: {
        inProgress: false as boolean
    },
    // inProgress: false as boolean
}


export const inProgress = (bool: boolean, typeOfComponent: TypeOfComponent): InProgressType => {
    
    return { type: IN_PROGRESS, bool, typeOfComponent }
}



const preloader = (state: PreloaderStateType = initialState, action: InProgressType): PreloaderStateType => {
    switch (action.type) {
        case IN_PROGRESS:

            if (state[`${action.typeOfComponent}`].inProgress !== action.bool) {
                const preloader = { ...state }
                preloader[`${action.typeOfComponent}`] = { ...state[`${action.typeOfComponent}`], inProgress: action.bool }
                return { ...preloader }
            }
            return state


        default:
            return state
    }
}


export type PreloaderStateType = typeof initialState

export type InProgressType = {
    type: typeof IN_PROGRESS,
    bool: boolean,
    typeOfComponent: TypeOfComponent
}

type TypeOfComponent = 'global' | 'page' | 'component'

export default preloader