import style from './Input.module.css'
import React from 'react'
import getLoginRegistrationIcon from '../../../../../../../assets/imgs/login-form/login-registartion-imgs'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldPropsType } from '../Login-Form'
import { FieldValidatorType } from '../../../../../../utils/Validators/validator'

type InputProps = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder: string
    type:string
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
    let icon = getLoginRegistrationIcon(props.placeholder, index)
    

    return (
        <>
            <div className={containerClass}>
                {icon}

                <input
                    {...props.input}
                    key={props.placeholder}
                    className={style.input}
                    type={`${props.type}`}
                    placeholder={props.placeholder} />
                {error}
            </div>

        </>
    )

}


export default Input