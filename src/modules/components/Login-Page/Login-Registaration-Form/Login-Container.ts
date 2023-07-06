import { connect } from "react-redux"

import { LoginFieldsType, SetErrorType } from "../../../redux/reducers/login-registaration/login-registration-reducer"
import { setError } from "../../../redux/reducers/login-registaration/login-registration-reducer"
import { AppStateType } from "../../../redux/store"
import LoginFormCard from "./Form-Card/Login-Form-Card"
import { authApi } from "../../../services/firebase-api/firebase-api"

type LoginMapStateType = {
    isAuth: boolean
    type: string
    dataFields: LoginFieldsType
    title: string
    instruction: string
    forgotLink: string
    footerInstruction: string
    footerLink: string
    error: string
}
type LoginMapDispatchType = {
    login: (email: string, password: string) => void
    setError: (error: string) => SetErrorType
}

export type LoginPropsType = LoginMapStateType & LoginMapDispatchType

const mapStateToProps = (state: AppStateType): LoginMapStateType => {
    const login = state.loginRegistration.login

    return {
        isAuth: state.auth.isAuth,
        type: login.type,
        dataFields: login.fields,
        title: login.title,
        instruction: login.instruction,
        forgotLink: login.forgotLink,
        footerInstruction: login.footerInstruction,
        footerLink: login.footerLink,
        error: state.loginRegistration.error
    }
}
const connector = connect(mapStateToProps, {
    login: authApi.login,
    setError
})

export default connector(LoginFormCard)