import { Formik } from 'formik';
import Button from '../Button/Button';
import style from './Card.module.scss';
import { Children } from 'react';

const Card = (props) => {
    
    return (
        <Formik
            initialValues={
                props.formikInitialValues
            }

            validate={values => {
                const errors = {};

                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                props.clientFields.forEach(field => {
                    console.log('ID: ', field.id, ' Value: ', values[field.id]);
                });
                let result = {
                    contract: {
                        id: 0,
                        name: 'contract',
                        rName: 'Тип договора',
                        bitrixId: 'UF_CRM_1540190343',
                        value: '',


                    },
                    contractName: {
                        id: 1,
                        name: 'contract',
                        rName: 'Тип договора',
                        bitrixId: 'UF_CRM_1540190343',
                        value: '',

                    },

                }


                for (const key in values) {
                    let counter = 0
                    if (counter === 3) {
                        counter = 0

                    } else {
                        counter++
                        if (counter === 2) {
                            result[key].value = values[key]
                        } else if (counter === 1) {
                            result[key].bitrixId = values[key]
                        } else if (counter === 0) {
                            result[key].name = values[key]
                        }
                    }
                    // result[key][values[key]] = values[key]

                }
                // await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(result, null, 2));

                setTimeout(() => {
                    alert(JSON.stringify(result, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => {
                
                return <div className={style.card} onSubmit={handleSubmit}>
                    <div className={style.card__header}>
                        <h2 className={style.card__name}>Client Name</h2>

                    </div>
                    <div className={style.menu}>
                        {
                            props.children({
                                ...props,
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            })
                        }

                    </div>

                    <div className={style.card__footer}>
                        <div className={style.button}>
                            {/* <Button disabled={isSubmitting} color={'blue'} border={3} name={'Cохранить'} {...props} /> */}
                        </div>

                        <button
                            style={{
                                borderRadius: 3,
                                backgroundColor: 'rgb(83, 125, 240)',
                                color: 'white'
                            }}
                            type='submit'
                            name={'whiteButton'}

                            disabled={isSubmitting}
                            className={style.button} >
                            <p
                                className={style.button__name}>
                                {'Cохранить'}
                            </p>
                        </button>
                    </div>


                </div>
            }
            }
        </Formik>
    )
}


export default Card