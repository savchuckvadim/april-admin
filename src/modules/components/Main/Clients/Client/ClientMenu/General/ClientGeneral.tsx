import { Field, FormikErrors, FormikTouched } from 'formik'
import style from './ClientGeneral.module.scss'
import ClientGeneralInput from './ClientGeneralInput/ClientGeneralInput'
import { ClientType } from '../../../../../../types/types'
import { FieldType } from 'redux-form'
import { ClientFields } from '../ClientForm/ClientForm'




type ClientGeneralPropsType = {
    client: ClientType
    isChanged: boolean
    isNew: boolean
    errors: FormikErrors<ClientFields>
    touched: FormikTouched<ClientFields>
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setClientName: (name: string) => void

}


const ClientGeneral: React.FC<ClientGeneralPropsType> = ({ client, isChanged, isNew, touched, errors, handleChange, setClientName }) => {


    return (
        <div className={style.general__wrapper}>
            {/*GENERAL*/}
            <div className={style.general__items}>

                {!client.name
                    && <div className={style.general__row}>
                        <div className={style.name__wrapper}>
                            <p className={style.general__name}> Name</p>
                        </div>

                        <div className={style.input__wrapper}>
                            <Field

                                name={'name'}
                                onChange={handleChange}
                                component={ClientGeneralInput}
                                error={errors.name}
                                touched={touched.name}
                                setClientName={setClientName}
                            // value={initialValues.name}
                            />

                        </div>

                    </div>}


                <div className={style.general__row}>
                    <p className={style.general__name}> E-mail</p>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'email'}
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.email}
                            touched={touched.email}

                        />

                    </div>

                </div>
                <div className={style.general__row}>
                    <h3 className={style.general__name}> Domain</h3>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'domain'}
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.domain}
                            touched={touched.domain}
                        />
                    </div>

                </div>
                <div className={style.general__row}>
                    <h3 className={style.general__name}>Key</h3>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'key'} //placement key
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.key}
                            touched={touched.key}
                        />
                    </div>

                </div>
                <div className={style.general__row}>
                    <h3 className={style.general__name}>Hook</h3>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'hook'} //hook -url
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.hook}
                            touched={touched.hook}
                        />
                    </div>

                </div>
                <div className={style.general__row}>
                    <h3 className={style.general__name}>clientId</h3>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'clientId'}  //REST_CLIENT_ID
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.clientId}
                            touched={touched.clientId}
                        />
                    </div>

                </div>
                <div className={style.general__row}>
                    <h3 className={style.general__name}>clientSecret</h3>
                    <div className={style.input__wrapper}>
                        <Field
                            name={'clientSecret'} //REST_CLIENT_SECRET
                            onChange={handleChange}
                            component={ClientGeneralInput}
                            error={errors.clientSecret}
                            touched={touched.clientSecret}
                        />
                    </div>

                </div>
            </div>
            {isChanged || !isNew
                ? <div className={style.general__errors}>

                    {!client.name
                        && <div className={style.general__row}>
                            <div className={style.input__wrapper}>
                                <p className={style.general__error}>{touched.name && errors.name}</p>
                            </div>
                        </div>
                    }


                    <div className={style.general__row}>
                        {/* <div className={style.input__wrapper}> */}
                        <p className={style.general__error}>{touched.email && errors.email}</p>
                        {/* </div> */}
                    </div>

                    <div className={style.general__row}>
                        {/* <div className={style.input__wrapper}> */}
                        <p className={style.general__error}>{touched.domain && errors.domain}</p>
                        {/* </div> */}

                    </div>
                </div>
                : <div className={style.description__wrapper}>
                    <p className={style.description}>Ведите актуальные данные о клиенте</p>
                </div>
            }



        </div>
    )
}


export default ClientGeneral