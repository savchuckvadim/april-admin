import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { RegistrationPropsType } from '../Registration-Container'
import style from './Form-Card.module.scss'
import RegistrationForm from './Form/Registration-Form'
import { useDispatch } from 'react-redux'
import { reset, stopSubmit } from 'redux-form'
// import { ClientMJStatusType } from '../../../../redux/reducers/auth/auth-reducer'


export type RegistarationFieldsValuesType = {
    name: 'name'
    surname: 'surname'
    email: 'email'
    password: string
    phone: 'phone',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    date: 'date',

    status: boolean,
    isMedical: boolean,
    isRecreation: boolean,

    documentFirst: 'documentFirst',
    documentSecond: 'documentSecond',


    signature: string,
    repeatPassword: string

}


export type RegistarationKeys = keyof RegistarationFieldsValuesType

export type RegistrationOnSubmitType = (values: RegistarationFieldsValuesType) => void

const RegistrationFormCard: React.FC<RegistrationPropsType> = (props) => {
    let type = props.type

    const dispatch = useDispatch();
    const onSubmit: RegistrationOnSubmitType = (values: RegistarationFieldsValuesType) => {

        
        console.log('values')
        console.log(values)
        if (values.password === values.repeatPassword) {
            console.log(values.signature)

            if (!values.isMedical && !values.isRecreation) {
                let message = 'Specify the type of consumption'
                let action = stopSubmit('login', {
                    _error: message
                })
                dispatch(action)

            } else {

                // let status = {
                //     isMj: values.status as boolean,
                //     isMedical: values.isMedical as boolean,
                //     isRecreation: values.isRecreation as boolean
                // } as ClientMJStatusType

                props.setNewUser(
                    values.name,
                    values.surname,
                    values.email,
                    values.password,
                    values.phone,
                    values.documentType,
                    values.documentNumber,
                    values.date,
                    // status,
                    // values.documentFirst,
                    // values.documentSecond,
                    // values.signature
                )
                // return <Navigate replace to='../contacts' />
            }

        } else {
            let message = 'Password is wrong'
            let action = stopSubmit('login', {
                _error: message
            })
            dispatch(action)

        }

    }

    if (props.isAuth) { return <Navigate replace to='../profile' /> }
    return (
        <div className={style.wrapper}>

            <div className={style.form__title}>
                <h1>
                    {props.title}
                </h1>
                <p >{props.error
                    ? <span className={style.error}>{props.error}</span>
                    : props.instruction}</p>
            </div>

            <div className={style.registrationFform__container}>

                {/* <RegistrationForm
                    // {...props} onSubmit={onSubmit} 
                    isAuth={props.isAuth}
                    onSubmit={onSubmit}
                    setError={props.setError}
                    setNewUser={props.setNewUser}
                    error={props.error}
                    // dataFields={props.dataFields}
                    preloader={props.preloader}

                /> */}

                <div className={style.form__footer}>
                    <div className={style.description}>
                        {type === 'registration'
                            ? props.privacy
                            // @ts-ignore
                            : <NavLink className={style.link} to={`profile`} activeclassname='active'>{props.forgotLink}</NavLink>
                        }

                    </div>
                    <div className={style.line__wrapper}>
                        <hr className={style.line} ></hr>
                    </div>
                    <div className={style.link__container}>
                        <p className={style.footer__text}>
                            {props.footerInstruction}
                            {// @ts-ignore
                                <NavLink className={style.link} to={`profile`} activeclassname='active'>
                                    {props.footerLink}
                                </NavLink>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationFormCard 