import React, { useState } from "react"
import { Field, FieldType, InjectedFormProps, reduxForm } from 'redux-form'
import { SetErrorType } from "../../../../redux/reducers/login-registaration/login-registration-reducer"
import style from '../ClientTemplate.module.scss'
import FileInput from "../../../Elements/Inputs/File/FileInput"
import { ClientTemplateOnSubmitType, ClientTemplateValuesType, OnDocumentUploadType } from "../ClientTemplate"



type ClientTemplateFormPropsType = {
    // onSubmit: RegistrationOnSubmitType
    documentFirst: 'documentFirst',
    onSubmit: ClientTemplateOnSubmitType
    onDocumentUpload: OnDocumentUploadType
    // error: string
    // preloader: boolean
}


const TemplateForm: React.FC<InjectedFormProps<ClientTemplateValuesType, ClientTemplateFormPropsType> & ClientTemplateFormPropsType> = (props) => {



    return (<>

        <form key={`registration__form`} onSubmit={props.handleSubmit} className={style.inputs__container}>
            <div key={`inputs_wrapper`} className={style.inputs__wrapper}>


                <CheckBoxesArea key={`checkboxarea-client-template`} {...props} />

            </div>
        </form>
    </>

    )
}
// reduxForm<FormValuesType, OwnPropsType>
export default reduxForm<ClientTemplateValuesType, ClientTemplateValuesType>({
    form: 'client-template'
    //@ts-ignore
})(TemplateForm)


const CheckBoxesArea: React.FC<InjectedFormProps<ClientTemplateValuesType, ClientTemplateFormPropsType> & ClientTemplateFormPropsType> = (props) => {
    const [isOptionsShow, setIsOptionShow] = useState(false)
    const [checkedOption, setCheckedOption] = useState(true)
    //  const [containerClass, setContainerClass] = useState(style.checkboxes__wrapper)


    // useEffect(() => {
    //     let errorTitle = null
    //     let er = null

    // if (isOptionsShow) {

    //     setContainerClass(checkboxstyle.checkboxes__wrapperActive)

    //     if (reduxField && (!isMJ || isMJ && !isRecreation && !isMedical && isMouseLeave)) {

    //         errorTitle = 'Por favor seleccione al menos un tipo de uso'
    //         er = <div className={inputstyle.error__wrapper}> <span className={inputstyle.input__error}>{errorTitle}</span></div>
    //         setContainerClass(checkboxstyle.checkboxes__wrapperError)

    //     }

    // }




    // @ts-ignore
    // setError(er)
    // }, [isMJ, isMedical, isRecreation, reduxField, isMouseLeave])

    // useEffect(() => {
    //         if (!reduxField) {
    //             setIsMouseLeave(false)
    //         }


    // }, [ isMouseEnter])

    

    return (
        <div
            className={style.checkboxes__wrapper}
        // onMouseLeave={() => setIsMouseLeave(true)}
        // onMouseEnter={() => setIsMouseEnter(true)}
        >
            <div className={style.checkboxes__wrapper__inner}>
                <Field
                    component={FileInput}
                    // validate={[checkboxesValidator]}
                    type='checkbox'
                    name={'status'}
                    label={'¿Consumes marihuana?'}
                    key={'registration-check-1'}
                    setIsOptionShow={setIsOptionShow}
                    formName={'client-template'}
                    onDocumentUpload={props.onDocumentUpload}


                />


            </div>

            {/* {error} */}


        </div>
    )
}
