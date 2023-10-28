
import React from 'react'
import { useState, useEffect } from 'react'
import style from './Input.module.scss'
// import getLoginRegistrationIcon from '../../../../../../../assets/imgs/login-form/login-registartion-imgs'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form'
// import { FieldValidatorType } from '../../../../../../utils/Validators/validator'
// import PhoneInput from 'react-phone-input-2';
import FileInput from './File-Input'
import date from './Date.module.scss'
import { FieldValidatorType } from '../../../../../../../../utils/Validators/validator'


type InputProps = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder: string
    type: string
    validate: Array<FieldValidatorType>
}


const Input: React.FC<InputProps> = (props) => {




    let index = 0
    let containerClasses = [style.container, style.containerFocus]
    let error = null

    if (props.meta.active || props.input.value) {
        index = 1
    }

    if (props.meta.error && props.meta.touched && !props.meta.active) {
        error = <span className='error'>{props.meta.error}</span>
    }

    let containerClass = containerClasses[index]
    // let icon = getLoginRegistrationIcon(props.placeholder, index)

    let component = <></>

    if (props.type === 'file') {

        component = <FileInput  {...props} containerClass={containerClass} error={error} />

    } else if (props.type === 'phone') {

        component = <FileInput  {...props} containerClass={containerClass} error={error} />
        // <PhoneInput
        //     // @ts-ignore
        //     defaultCountry="sp"
        //     {...props.input}
        //     key={props.placeholder}
        //     // @ts-ignore

        //     type={`${props.type}`}
        //     placeholder={props.placeholder}
        //     inputExtraProps={{
        //         className: style.phone, // Добавьте новый класс для убирания бордеров
        //     }}
        //     style={{ boder: 'none' }}

        // />
    } else if (props.type === 'date') {
        component = <div className={`${style.input}, ${date.wrapper}`}>
            <input
                {...props.input}
                key={props.placeholder}
                className={style.inputDate}
                type={props.type}
                placeholder={props.placeholder}

            />

        </div>
    } else {
        component = <input
            {...props.input}
            key={props.placeholder}
            className={style.input}
            type={props.type}
            placeholder={props.placeholder} />
    }



    return (
        <>
            <div className={containerClass}>

                {component}

                <span className={style.input__error}>{error}</span>
            </div>

        </>
    )




}


export default Input