import React, { useState, useEffect } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Field } from 'redux-form'
// import { checkboxesValidator, emailValidate, passwordValidate, requiredFields } from '../../../../../utils/Validators/validator'
import style from './Form.module.scss'
import inputstyle from './Inputs/Input.module.scss'
import checkboxstyle from './Inputs/Checkbox.module.scss'
import Input from './Inputs/Input-Login-Registartion'
// import Button from '../../../../Elements/Button/Button'
// import { FieldType, SetErrorType } from '../../../../../redux/reducers/login-registaration/login-registration-reducer'
import { RegistarationFieldsValuesType, RegistrationOnSubmitType } from '../Registration-Form-Card'
import Signature from './Inputs/Input-Signature'
import CheckboxInput from './Inputs/Input-Check'
import { SetErrorType } from '../../../../../../../redux/reducers/login-registaration/login-registration-reducer'
import { FieldType } from '../../../../../../../types/types'
import Button from '../../../../../../Elements/Button/Button'
import { emailValidate, passwordValidate, requiredFields } from '../../../../../../../utils/Validators/validator'
// import { ClientMJStatusType } from '../../../../../redux/reducers/auth/auth-reducer'


type RegistrationFormPropsType = {
    onSubmit: RegistrationOnSubmitType
    setError: (error: string) => SetErrorType
    isAuth: boolean
    dataFields: Array<FieldType>
    setNewUser: (
        name: string,
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
    error: string
    preloader: boolean
}

const RegistrationForm: React.FC<InjectedFormProps<RegistarationFieldsValuesType, RegistrationFormPropsType> & RegistrationFormPropsType> = (props) => {



    if (props.error) {
        props.setError(props.error)
    }


    let validate = null


    let iLeft = [] as Array<any>
    let iRight = [] as Array<any>
    props.dataFields.forEach((field, i) => {

        if (field.name === 'email') {
            validate = emailValidate
        } else if (field.name === 'password') {
            validate = passwordValidate
        } else {
            validate = requiredFields
        }

        let component = Input
        if (field.name === 'signature') {
            component = Signature
        }

        let input = <Field
            // disabled={props.preloader}
            component={component}
            validate={[validate]}
            name={field.name}
            type={field.type}
            // placeholder={field.placeholder}
            key={`${field.name}-${i}`} />

        if (i < (props.dataFields.length / 2 + 3)) {
            // @ts-ignore
            iLeft.push(input)

        } else {
            i === 9 && iRight.push(<CheckBoxesArea key={`checkboxarea-${field.name}-${i}`} {...props} />)
            // @ts-ignore
            iRight.push(input)
        }



    })
    // iRight.push(<CheckBoxesArea {...props} />)
    iRight.push(<FormButton key={`registration-form-button`} />)
    let inputsLeft = <div key={`inputs_wrapper_left`} className={style.input__group}>

        {iLeft}
    </div>
    let inputsRight = <div key={`inputs_wrapper_right`} className={style.input__group}>
        {/* //@ts-ignore */}
        {iRight}
    </div>

    return (<>

        <form key={`registration__form`} style={{ opacity: props.preloader ? '50%' : '100%' }} onSubmit={props.handleSubmit} className={style.inputs__container}>
            {/* handleSubmit, error, captchaSubmit ? */}
            <div key={`inputs_wrapper`} className={style.inputs__wrapper}>
                {inputsLeft}
                {inputsRight}
            </div>

            {/* <div className={style.bottom__area}>

            </div> */}


        </form>
    </>

    )
}
// reduxForm<FormValuesType, OwnPropsType>
export default reduxForm<RegistarationFieldsValuesType, RegistrationFormPropsType>({
    form: 'login'
})(RegistrationForm)


const CheckBoxesArea: React.FC<InjectedFormProps<RegistarationFieldsValuesType, RegistrationFormPropsType> & RegistrationFormPropsType> = (props) => {
    const [isOptionsShow, setIsOptionShow] = useState(false)
    const [checkedOption, setCheckedOption] = useState(true)

    const [isMedical, setIsMedical] = useState(false)
    const [isRecreation, setIsRecreation] = useState(false)
    const [isMJ, setIsMJ] = useState(false)
    const [error, setError] = useState(null as null | '<span className={style.input__error}>{\'Por favor seleccione al menos un tipo de uso\'}</span>')
    const [containerClass, setContainerClass] = useState(checkboxstyle.checkboxes__wrapper)
    const [reduxField, setFieldError] = useState(false)
    const [isMouseLeave, setIsMouseLeave] = useState(false)
    const [isMouseEnter, setIsMouseEnter] = useState(false)

    useEffect(() => {
        let errorTitle = null
        let er = null

        if (isOptionsShow) {

            setContainerClass(checkboxstyle.checkboxes__wrapperActive)

            if (reduxField && (!isMJ || isMJ && !isRecreation && !isMedical && isMouseLeave)) {

                errorTitle = 'Por favor seleccione al menos un tipo de uso'
                er = <div className={inputstyle.error__wrapper}> <span className={inputstyle.input__error}>{errorTitle}</span></div>
                setContainerClass(checkboxstyle.checkboxes__wrapperError)

            }

        }




        // @ts-ignore
        setError(er)
    }, [isMJ, isMedical, isRecreation, reduxField, isMouseLeave])

    useEffect(() => {
            if (!reduxField) {
                setIsMouseLeave(false)
            }


    }, [ isMouseEnter])

    

    return (
        <div
            className={containerClass}
            onMouseLeave={() => setIsMouseLeave(true)}
            onMouseEnter={() => setIsMouseEnter(true)}
        >
            <div className={checkboxstyle.checkboxes__wrapper__inner}>
                <Field
                    component={CheckboxInput}
                    // validate={[checkboxesValidator]}
                    type='checkbox'
                    name={'status'}
                    label={'¿Consumes marihuana?'}
                    key={'registration-check-1'}
                    setIsOptionShow={setIsOptionShow}
                    isMedical={isMedical}
                    isRecreation={isRecreation}
                    isMJ={isMJ}
                    setIsMJ={setIsMJ}
                    setFieldError={setFieldError}
                    isMouseLeave={isMouseLeave}

                />
                {isOptionsShow && <><Field
                    component={CheckboxInput}
                    // validate={[checkboxesValidator]}
                    type='checkbox'
                    name={'isMedical'}
                    label={'¿Con médicos?'}

                    key={'registration-select-1'}
                    checkedOption={checkedOption}
                    setCheckedOption={setCheckedOption}
                    setIsMedical={setIsMedical}
                    isMedical={isMedical}
                    isRecreation={isRecreation}
                    isMJ={isMJ}
                    setFieldError={setFieldError}

                />

                    <Field
                        component={CheckboxInput}
                        // validate={[checkboxesValidator]}
                        name={'isRecreation'}
                        label={'¿Con recreativos?'}
                        type='checkbox'
                        key={'registration-select-2'}
                        checkedOption={checkedOption}
                        setCheckedOption={setCheckedOption}
                        setIsRecreation={setIsRecreation}
                        isMedical={isMedical}
                        isRecreation={isRecreation}
                        isMJ={isMJ}
                        setFieldError={setFieldError}
                    />
                </>}

            </div>

            {error}


        </div>
    )
}

const FormButton = () => {
    return (
        <div key={`registration-button__container`} className={style.button__container}>
            <Button key={`registration-button`} disabled={false} onClick={undefined} color={'blue'} border={12} name={'Sign Up'} />
        </div>
    )
}