import style from './EntityMenu.module.scss'
import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import { FieldType } from 'redux-form'
import ActionsFrame from '../../../../Elements/Actions/Navigation/ActionsFrame'
import Navigation from '../../../../Elements/Actions/Navigation/Navigation/Navigation'
import { schemaClient } from '../../../../../utils/Validators/validator-april'
import EntityMenu from './EntityMenu'
import { ClientType, ContractType } from '../../../../../types/types'
import { Template, TemplateField } from '../../../../../types/template-types'
import CreateField from '../../../Template/CreateField'


type SendingValuesType = {
    name: string
    email: string
    domain: string
    key: string
    hook: string
    clientId: string
    clientSecret: string
}

export type ClientFields = {
    name: string | null
    email: string | null
    domain: string | null
    key: string | null
    hook: string | null
    clientId: string | null, // from other hook key
    clientSecret: string | null, // from other hook key
    fields: { string: FieldType } | {}
    number: number | null
}


export enum ClientSectionEnum {
    General = 'General',
    Fields = 'Fields',
    Products = 'Products',
    Contracts = 'Contracts',
    Prices = 'Prices',
    Regions = 'Regions',
    Templates = 'Templates'

}


type EntityFormPropsType = {
    entity: Template | TemplateField
    name: string

}


const EntityForm: React.FC<EntityFormPropsType> = ({ 
    entity, 
    name,
  }) => {
    const sections = [
        ClientSectionEnum.General, ClientSectionEnum.Fields, ClientSectionEnum.Products, ClientSectionEnum.Contracts,
        ClientSectionEnum.Prices, ClientSectionEnum.Regions, ClientSectionEnum.Templates
    ] as Array<ClientSectionEnum>
  

    return (
        < div className={style.client}>


            <div className={style.client__wrapper}>
                <div className={style.card__header}>
                    <h2 className={style.card__name}>{entity.name}</h2>
                </div>


                <Formik

                    initialValues={{
                        ...entity
                    }}
                    validationSchema={schemaClient}
                    onSubmit={(values, { setSubmitting }) => {
                        
                      

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
                    /* and other goodies */
                }) => {




                    return <Form className={style.form} onChange={() => { 

                    }}>
                        <div className={style.card} >


                       
                       
                            <div className={style.card__footer}>
                                <div className={style.button}>
                                    {/* <Button disabled={isSubmitting} color={'blue'} border={3} name={'Cохранить'} {...props} /> */}
                                </div>

                                {<button
                                    style={{
                                        border: 'none',
                                        borderRadius: 3,
                                        backgroundColor: 'rgb(83, 125, 240)',
                                        color: 'white'
                                    }}
                                    type='submit'
                                    // name={'whiteButton'}

                                    disabled={isSubmitting}
                                    className={style.button} >
                                    <p
                                        className={style.button__name}>
                                        {'Cохранить'}
                                    </p>
                                </button>}
                            </div>

                        </div>

                    </Form>
                }}
                </Formik>
            </div>
            {name === 'template' && <CreateField templateId={entity.id} />}
        </div>
    )
}





export default EntityForm