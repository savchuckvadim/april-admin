import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Field } from 'redux-form'
import { emailValidate, FieldValidatorType, passwordValidate, requiredFields } from '../../../../../utils/Validators/validator'
import style from './Form.module.css'
import Input from './Inputs/Input-Login-Registartion'
import Button from '../../../../Elements/Button/Button'
import { LoginFieldsType, SetErrorType } from '../../../../../redux/reducers/login-registaration/login-registration-reducer'
import { FieldsValuesType, OnSubmitType } from '../Login-Form-Card'

// type FieldsType = LoginFieldsType | RegistrationFieldsType
export type LoginFormPropsType = {
    onSubmit: OnSubmitType
    setError: (error: string) => SetErrorType
    dataFields: LoginFieldsType
    login: (email: string, password: string) => void
    error: string
}
export type FieldPropsType = {
    validate:FieldValidatorType
    name:string
    type:string
    placeholder:string 
    key:string
}

let LoginForm: React.FC<InjectedFormProps<FieldsValuesType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
    if (props.error) {
        props.setError(props.error)
    }


    let inputs = []

    let validate = null

    inputs = props.dataFields.map(field => {

        if (field.name === 'email') {
            validate = emailValidate
        } else if (field.name === 'password') {
            validate = passwordValidate
        } else {
            validate = requiredFields
        }
        return <Field
            component={Input}
            validate={[validate]}
            name={field.name}
            type={field.name}
            placeholder={field.placeholder}
            key={field.name}
        />
    }
    )

    return (<>

        <form onSubmit={props.handleSubmit} className={style.inputs__container}>
            {/* handleSubmit, error, captchaSubmit ? */}
            {inputs}
            <div className={style.button__container}>
                {/* <NavLink className={style.button__container} to={'../'}>  */}
                <Button disabled={false} onClick={undefined} color={'blue'} border={16} name={'НАЖАТЬ'} />
                {/* </NavLink> */}
            </div>

        </form>
    </>

    )
}
// reduxForm<FormValuesType, OwnPropsType>
export default reduxForm<FieldsValuesType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)