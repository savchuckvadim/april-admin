import { Field, Form, Formik, useField } from "formik";
import Filter from "../../../Elements/Filter/Filter";
import FilterButtons from "../../../Elements/Filter/Filter-Buttons/Filter-Buttons";
import style from './FieldsUpdate.module.scss'
import { validate } from "../../../../utils/Validators/validator-april";



export const FieldsUpdateInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    //@ts-ignore
    const [field, meta] = useField(props.field);

    
    return (
        <>
            {/* <label htmlFor={props.id || props.name}>{label}</label> */}
            <input type='text' className={!meta.error ? style.secret__input : style.secret__inputError}
                {...field} {...props}
            ></input>

            {/* {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} */}
        </>
    );
};



const FieldsUpdate = ({ updateFields }) => (

    <Formik
        initialValues={{ fieldsUpdate: '' }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {

            updateFields(values.fieldsUpdate)
            // setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            // }, 400);
            setSubmitting(true)
        }}
    >
        {formik => {
            
            
            const doubleClick = (e) => {
                formik.handleBlur(e);
                formik.setErrors({});
                
                console.log(formik.errors)
            };

            return (
                <>
                <Form>
                    <Filter isLong={true} name={'FieldsUpdate'} callback={() => { alert('Fields') }} >
                        <div className={!formik.errors.fieldsUpdate ? style.secret__wrapper : style.secret__wrapperError}>
                            <Field
                                name="fieldsUpdate"
                                component={FieldsUpdateInput}
                                label="fieldsUpdate"
                                placeholder={formik.errors.fieldsUpdate || 'secret key'}
                                onDoubleClick={doubleClick}
                                
                            />

                            {/* <input  {...formik} {...props}  name="fieldsUpdate" type='text' placeholder="secret key" className={style.secret__input}></input> */}
                        </div>
                        <FilterButtons actions={['Загрузить']} filter={() => alert(`Загрузить`)} />
                    </Filter>
                </Form>
       
                </>
            )
        }}
    </Formik>

)


export default FieldsUpdate