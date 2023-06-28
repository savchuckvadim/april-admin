const SET_ERROR = 'SET_ERROR'
export type FieldType = {
    name: string
    placeholder: string
}
export type LoginFieldsType = Array<FieldType>
const initialState = {
    login: {
        type: 'login' as string,
        fields: [
            {
                name: 'email' as string,
                placeholder: 'E-mail' as string
            },
            {
                name: 'password' as string,
                placeholder: 'Password' as string
            },


        ] as LoginFieldsType,
        title: 'Log in',
        instruction: 'Use your email and password to continue',
        forgotLink: `Forgot password?`,
        footerInstruction: `Don't you have an account yet? `,
        footerLink: `Sign up`
    },
    registration: {
        type: 'registration',
        fields: [
            {
                name: 'name' as string,
                placeholder: 'Name' as string
            },
            {
                name: 'surname' as string,
                placeholder: 'Surname' as string
            },
            {
                name: 'email' as string,
                placeholder: 'E-mail' as string
            },
            {
                name: 'password' as string,
                placeholder: 'Password' as string
            },
            {
                name: 'repeatPassword' as string,
                placeholder: 'Repeat Password' as string
            },


        ]as Array<FieldType>,
        title: 'Getting started',
        instruction: 'Create an account to continue and connect with the Sociopaths.',
        privacy: `By pressing Sign Up, you agree to the Terms of Service and Privacy Policy.`,
        footerInstruction: `Already have an account? `,
        footerLink: `Sign In`
    },
    error: '' as string
}
export type LoginRegistrationType = typeof initialState
// export type LoginFieldsType = typeof initialState.login.fields
// export type RegistrationFieldsType = typeof initialState.registration.fields

export const setError = (error: string):SetErrorType => {

    return {
        type: SET_ERROR,
        error
    }
}
export type SetErrorType = {
    type: typeof SET_ERROR,
    error: string
}
const LoginRegistrationReducer = (state: LoginRegistrationType = initialState, action: any): LoginRegistrationType => {

    switch (action.type) {
        case SET_ERROR:
            let result = { ...state }
            result.error = action.error
            return result

        default:
            return state
    }

}

export default LoginRegistrationReducer