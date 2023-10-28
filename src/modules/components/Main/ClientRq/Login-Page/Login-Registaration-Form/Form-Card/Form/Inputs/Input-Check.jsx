import { change, stopSubmit } from 'redux-form'
import inputstyle from './Input.module.scss'
import style from './Checkbox.module.scss'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'

const CheckboxInput = (props) => {

    const dispatch = useDispatch();
    let index = 0
    let containerClasses = [style.containerCheckBox, style.containerCheckBoxFocus]
    let error = null;
    let inputElement = null;

    let errorTitle = null
    let opacity = '70%'



    if (props.meta.touched || props.input.value) {
        index = 1
        opacity = '100%'
    }

    if (props.meta.error && props.meta.touched && !props.meta.active && props.isMouseLeave) {
        error = <span key={`select-${props.input.name}-error`} className={inputstyle.input__error}>{props.meta.error}</span>
        errorTitle = 'Por favor seleccione al menos un tipo de uso'
        props.setFieldError(true)


    }
    else if (props.input.name === 'status' && !props.isMedical && !props.isRecreation && props.meta.touched && !props.meta.active && props.isMouseLeave) {
        error = <span className={inputstyle.input__error}>{props.meta.error}</span>
        errorTitle = 'Por favor seleccione al menos un tipo de uso'
        props.setFieldError(true)

    } else {
        if (props.errorComponent) {
            props.setFieldError(false)
        }

    }


    let containerClass = containerClasses[index]
    let labelClass = error ? style.checkboxeslabelError : style.checkboxeslabel
    let mjCheckbox = style.checkboxeslabel

    const handleFileChange = (event, type) => {


        switch (type) {
            case 'status':
                let mj = event.target.checked
                if (mj) {

                    props.setIsOptionShow && props.setIsOptionShow(true)
                } else {

                    props.setIsOptionShow && props.setIsOptionShow(false)
                    dispatch(change('login', 'isMedical', false));
                    dispatch(change('login', 'isRecreation', false));
                }

                props.setIsMJ(mj)
                dispatch(change('login', 'status', mj));

                break;


            case 'isMedical':
                let med = event.target.checked
                props.setIsMedical && props.setIsMedical(event.target.checked)

                dispatch(change('login', 'isMedical', med));

                break;


            case 'isRecreation':
                let rc = event.target.checked
                props.setIsRecreation && props.setIsRecreation(event.target.checked)

                dispatch(change('login', 'isRecreation', rc));

                break;

            default:
                break;
        }
        // const file = event.target.files[0];



    };



    // mjCheckbox = props.input.name !== 'status' && !props.isMedical && !props.isRecreation 
    // ? style.checkboxeslabelError 
    // : style.checkboxeslabel

    inputElement = (
        <>

            <Checkbox
                {...props.input}
                onChange={(e) => handleFileChange(e, props.input.name)}
                type="checkbox"
                className={style.checkbox}
                key={props.key}
                size={'small'}

            // checked={props.input.checked}


            />
            <label key={`label-${props.key}`} style={{ opacity }} className={mjCheckbox}>{props.label}</label>


        </>

    );



    return (
        <>
            {props.input.name === 'status' && <div key={`inputcheck_wrapper-${props.key}`} className={style.questions}>
                <p key={`inputcheck_label_title-${props.key}`} className={labelClass}>Por favor responda las preguntas</p>
            </div>}


            <div key={`inputcheck_inputelement-${props.key}`} className={containerClass} >
                {inputElement}
            </div>




            {/* {props.input.name !== 'status' && <div className={containerClass}>

            {inputElement}

            </div>} */}

        </>
    );
};

export default CheckboxInput;



