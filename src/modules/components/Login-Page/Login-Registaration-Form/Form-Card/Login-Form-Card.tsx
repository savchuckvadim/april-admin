import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { LoginPropsType } from '../Login-Container'
import style from './Form-Card.module.css'
import LoginForm from './Form/Login-Form'


export type FieldsValuesType = {
    email: 'email'
    password: 'password'
}
// export type LoginKeys = keyof FieldsValuesType

export type OnSubmitType = (values: FieldsValuesType) => void

const LoginFormCard: React.FC<LoginPropsType> = (props) => {
    let type = props.type

    const onSubmit: OnSubmitType = (values: FieldsValuesType) => {

        props.login(values.email, values.password)
        return <Navigate replace to='../profile' />
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

                <LoginForm
                    // {...props} onSubmit={onSubmit} 
                    onSubmit={onSubmit}
                    setError={props.setError}
                    login={props.login}
                    error={props.error}
                    dataFields={props.dataFields}
                />

                <div className={style.form__footer}>
                    {/* <div className={style.description}>
                       
                    </div> */}
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

export default LoginFormCard 