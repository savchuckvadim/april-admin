import { Field, Form, Formik } from "formik"
import { schemaClient } from "../../../../utils/Validators/validator-april"
import { useEffect, useState } from "react"
import FileInput from "../../../Elements/Inputs/File/FormikFileInput"
import Input from "../../../Login-Page/Login-Registaration-Form/Form-Card/Form/Inputs/Input-Login-Registartion"
import FormCheckbox from "../../../Elements/Inputs/Checkbox/FormCheckbox"



const EntityAdd = ({
    name,
    fields,
    parameters,
    // entityId, 
    // isInitializingAdd,
    // initialAddEntity,
    // setInitializingAddProcess,
    setUpdatingEntity
}) => {



    let resultValues = {}

    fields.map(f => (
        resultValues[f.name] = f.value === "0" ? false : f.value
    ))

    parameters.map(f => (
        resultValues[f.name] = f.value === "0" ? null : f.value
    ))

    const [initialValues, setInitialValues] = useState(resultValues)
    // setInitialValues(resultValues)


    // useEffect(() => {
    //     let resultValues = {}
    //     if (isInitializingAdd) {



    //         fields.map(f => (
    //             resultValues[f.name] = f.value
    //         ))


    //     } else {
    //         // if (!entityId) {

    //         //     // setInitializingAddProcess()
    //         // } else {

    //             resultValues = {}
    //             fields.map(f => (
    //                 resultValues[f.name] = f.value
    //             ))
    //             resultValues['file'] = {
    //                 name: 'file',
    //                 type: 'file',
    //                 value: null,
    //                 items: []
    //             }

    //         // }

    //     }
    //     // setInitialValues(resultValues)
    // }, [isInitializingAdd])


    //TODO для того чтобы добавить новую Entity надо сначала отправить на сервер domaIN И type
    
    return (
        <Formik

            initialValues={{
                ...initialValues
            }}
            // validationSchema={schemaClient}
            onSubmit={(values, { setSubmitting }) => {

                console.log('values')
                console.log(values)
                const fields = []
                for (const key in values.fields) {
                    //@ts-ignore
                    fields.push(values.fields[key])
                }

                const file = values.file
                const fieldIds = []
                
                fields.forEach(field => {
                    
                    values.forEach(value => {

                        if (field.name === value && field.value === true) {
                            fieldIds.push(field.id)
                        }
                    })
                   

                })
                
             
           
                
                setUpdatingEntity(`${name}/set`, name, values)


                setSubmitting(true);

            }}

        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setValues,

        }) => {

            // let touchedFlag = false
            // for (const key in touched) {

            //     //@ts-ignore
            //     if (touched[key]) {
            //         touchedFlag = true
            //     }
            // }
            // if (!touchedFlag && values.email !== initialValues.email) {
            //     setValues(initialValues)

            // }




            return <Form
                // className={style.form}
                onChange={() => {
                    //  !isChanged && setIsChanged(true)
                }}
            >
                <div
                // className={style.card} 
                >



                    <div
                    // className={style.card__footer}
                    >
                        <div
                        // className={style.button}
                        >
                            {/* <Button disabled={isSubmitting} color={'blue'} border={3} name={'Cохранить'} {...props} /> */}
                        </div>

                        <p>Main Parameters</p>
                        {parameters.map(field => {
                            
                            let component = field.type === 'file' ? FileInput : 'input'

                            return <Field
                                name={field.name}
                                placeholder={field.name}
                                component={component}
                                // component={'input'}
                                // fileRef={fileRef}
                                // portal={client.domain}
                                type={field.type === 'array' ? 'select' : field.type}
                            // fileName={'test-name'}

                            />
                        })}

                        <p>Fields</p>
                        {fields.map(field => <Field
                            name={field.name}
                            placeholder={field.name}
                            // component={FileUpload}
                            component={FormCheckbox}
                            // fileRef={fileRef}
                            // portal={client.domain}
                            type={'checkbox'}
                        // fileName={'test-name'}

                        />)}







                        {<button
                            style={{
                                border: 'none',
                                borderRadius: 3,
                                backgroundColor: 'rgb(83, 125, 240)',
                                color: 'white'
                            }}
                            type='submit'
                            disabled={isSubmitting}
                        // className={style.button} 
                        >

                            <p
                            // className={style.button__name}
                            >
                                {'Cохранить'}
                            </p>
                        </button>}
                    </div>

                </div>

            </Form>
        }}
        </Formik>
    )
}


export default EntityAdd