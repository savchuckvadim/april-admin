import { connect } from "react-redux"
// import { ClientMJStatusType, setNewUser } from "../../../redux/reducers/auth/auth-reducer"
// import { FieldType, SetErrorType } from "../../../redux/reducers/login-registaration/login-registration-reducer"
// import { AppStateType } from "../../../redux/store"
// import { setError } from "../../../redux/reducers/login-registaration/login-registration-reducer"

import RegistrationFormCard from "./Form-Card/Registration-Form-Card"
import { AppStateType } from "../../../../../redux/store"
import { FieldType } from "redux-form"
import { SetErrorType } from "../../../../../redux/reducers/login-registaration/login-registration-reducer"

type RegistrationMapStateType = {
    isAuth: boolean
    type: string
    dataFields: Array<FieldType>
    title: string
    instruction: string
    privacy: string
    footerInstruction: string
    footerLink: string
    error: string
    preloader: boolean

}
type RegistrationMapDispatchType = {
    setNewUser: (name: string,
        surname: string,
        email: string,
        password: string,
        phone: string,
        documentType: string,
        documentNumber: string,
        birthday: string,
        // clientStatus: ClientMJStatusType,
        // documentPhoto: any,
        // documentPhoto2: any,
        // signature: any
        ) => void
    setError: (error: string) => SetErrorType
}


export type RegistrationPropsType = RegistrationMapStateType & RegistrationMapDispatchType

const mapStateToProps = (state: AppStateType): RegistrationMapStateType => {
    const registration = state.loginRegistration.registration
    return {
        isAuth: state.auth.isAuth,
        type: registration.type,
        //@ts-ignore
        dataFields: registration.fields,
        title: registration.title,
        instruction: registration.instruction,
        privacy: registration.privacy,
        footerInstruction: registration.footerInstruction,
        footerLink: registration.footerLink,
        error: state.loginRegistration.error,
        preloader: state.preloader.component.inProgress,
       
    }
}

const RegistrationContainer = connect(mapStateToProps, {
    // setNewUser,
    // setError
})(RegistrationFormCard)

export default RegistrationContainer