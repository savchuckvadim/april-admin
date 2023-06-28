import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { RegistrationPropsType } from '../Registration-Container'
import style from './Form-Card.module.css'
import RegistrationForm from './Form/Registration-Form'


export type RegistarationFieldsValuesType = {
    name: 'name'
    surname: 'surname'
    email: 'email'
    password: 'password'
    repeatPassword: 'repeatPassword'
}
export type RegistarationKeys = keyof RegistarationFieldsValuesType

export type RegistrationOnSubmitType = (values: RegistarationFieldsValuesType) => void

const RegistrationFormCard: React.FC<RegistrationPropsType> = (props) => {
    let type = props.type
    const onSubmit: RegistrationOnSubmitType = (values: RegistarationFieldsValuesType) => {

        props.setNewUser(values.name, values.surname, values.email, values.password, values.repeatPassword)

    }

    if (props.isAuth) { return <Navigate replace to='../profile' /> }
    return (
        <div className={style.wrapper}>

            <div className={style.form__title}>
                <h1>
                    {props.title}
                </h1>
                <p>{props.error
                    ? <span className={style.error}>{props.error}</span>
                    : props.instruction}</p>
            </div>

            <div className={style.form__container}>

                <RegistrationForm
                    // {...props} onSubmit={onSubmit} 
                    isAuth={props.isAuth}
                    onSubmit={onSubmit}
                    setError={props.setError}
                    setNewUser={props.setNewUser}
                    error={props.error}
                    dataFields={props.dataFields}
                />

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