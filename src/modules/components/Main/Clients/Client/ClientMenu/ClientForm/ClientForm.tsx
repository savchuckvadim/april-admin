import style from './ClientMenu.module.scss'
// import Filter from '../../../../../Elements/Filter/Filter'
import { Formik, Form } from 'formik'

import React, { useEffect, useState } from 'react'
import { ClientType, ContractType, FieldType } from '../../../../../../types/types'
import { schemaClient } from '../../../../../../utils/Validators/validator-april';
import ClientMenu from './ClientMenu'
import ActionsFrame from '../../../../../Elements/Actions/Navigation/ActionsFrame'
import Navigation from '../../../../../Elements/Actions/Navigation/Navigation/Navigation'
import { updateClient } from '../../../../../../redux/reducers/client/client-reducer';



export type ClientFields = {
    name: string | null
    email: string | null
    domain: string | null
    key: string | null
    hook: string | null
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


type ClientFormPropsType = {
    client: ClientType
    // clientId: number | 'new' | false
    sendNewClient: (name: string, email: string, domain: string, placementKey: string, hookKey: string) => void
    updateClient: (client: ClientType) => void
    updateField: (fieldNumber: number, value: string, type: 'value' | 'bitrixId') => void
    updateClientProducts: (clientId: number) => void
    getProducts: (clientId: number) => void

}


const ClientForm: React.FC<ClientFormPropsType> = ({ client, sendNewClient, updateField, updateClientProducts, getProducts }) => {
    const sections = [
        ClientSectionEnum.General, ClientSectionEnum.Fields, ClientSectionEnum.Products, ClientSectionEnum.Contracts,
        ClientSectionEnum.Prices, ClientSectionEnum.Regions, ClientSectionEnum.Templates
    ] as Array<ClientSectionEnum>
    const [clientName, setClientName] = useState(client.name)

    const [sectionIndex, setSectionIndex] = useState(0)
    const [section, setSection] = useState(sections[sectionIndex] as ClientSectionEnum)
    const [isNew, setIsNew] = useState(false)
    const [isChanged, setIsChanged] = useState(false)

    const [initialValues, setInitialValues] = useState({
        name: null as string | null,
        email: null as string | null,
        domain: null as string | null,
        key: null as string | null,
        hook: null as string | null,
        fields: {} as { string: FieldType } | {},
        number: null as number | null,
        file: null as string | null
    })




    useEffect(() => {

        if (client) {
            if (client.number) {
                setIsNew(false)
            } else {
                setIsNew(true)
            }
        }
    }, [client])

    let contracts = {
        items: [] as Array<ContractType>,
        current: [] as Array<number>,
        bitrixId: null as string | null
    }
    useEffect(() => {
        let formikValuesFields = {}
        let updatedInitialValues = {
            name: null as string | null,
            email: null as string | null,
            domain: null as string | null,
            key: null as string | null,
            hook: null as string | null,
            fields: {} as { string: FieldType } | {},
            contracts,
            number: null as number | null,
            file: null as string | null
        }
        client.fields.forEach((clientField: FieldType) => {
            //@ts-ignore
            formikValuesFields[`${clientField.name}`] = clientField
        });
        !isNew ? updatedInitialValues.name = client.name : updatedInitialValues.name = null
        !isNew ? updatedInitialValues.email = client.email : updatedInitialValues.email = null
        !isNew ? updatedInitialValues.domain = client.domain : updatedInitialValues.domain = null
        !isNew ? updatedInitialValues.key = client.email : updatedInitialValues.key = null
        !isNew ? updatedInitialValues.hook = client.domain : updatedInitialValues.hook = null
        !isNew ? updatedInitialValues.number = client.number : updatedInitialValues.number = null
        !isNew ? updatedInitialValues.contracts = client.contracts : updatedInitialValues.contracts = contracts

        updatedInitialValues.fields = formikValuesFields
        setInitialValues(updatedInitialValues)

        debugger
    }, [client, isNew])





    useEffect(() => {

        if (section !== sections[sectionIndex]) {
            setSection(sections[sectionIndex])
        }

    }, [sectionIndex])



    return (
        < div className={style.client}>


            <div className={style.client__wrapper}>
                <div className={style.card__header}>
                    <h2 className={style.card__name}>{clientName || client.name}</h2>
                </div>

                {!isNew && <ActionsFrame align={'left'} color={'rgb(247, 242, 247)'}>
                    <Navigation
                        initialIndex={0}
                        actions={[ClientSectionEnum.General, ClientSectionEnum.Fields, ClientSectionEnum.Products, ClientSectionEnum.Contracts, ClientSectionEnum.Prices, ClientSectionEnum.Regions, ClientSectionEnum.Templates]}
                        navigate={setSectionIndex} />
                </ActionsFrame>
                }

                <Formik

                    initialValues={{
                        ...initialValues
                    }}
                    validationSchema={schemaClient}
                    onSubmit={(values, { setSubmitting }) => {
                        debugger
                        console.log('values')
                        console.log(values)
                        const fields = []
                        for (const key in values.fields) {
                            //@ts-ignore
                            fields.push(values.fields[key])
                        }

                        debugger
                        if (values.name && values.email && values.domain && values.key && values.hook) {
                            debugger
                            isNew
                                ? sendNewClient(values.name, values.email, values.domain, values.key, values.hook)
                                //@ts-ignore
                                : updateClient({ ...client, contracts: values.contracts })

                        }

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

                    let touchedFlag = false
                    for (const key in touched) {

                        //@ts-ignore
                        if (touched[key]) {
                            touchedFlag = true
                        }
                    }
                    if (!touchedFlag && values.email !== initialValues.email) {
                        setValues(initialValues)

                    }



                    return <Form className={style.form} onChange={() => { !isChanged && setIsChanged(true) }}>
                        <div className={style.card} >


                            <ClientMenu
                                section={section}
                                client={client}
                                isChanged={isChanged}
                                isNew={isNew}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                setClientName={setClientName}
                                updateField={updateField}
                                updateClientProducts={updateClientProducts}
                                getProducts={getProducts}
                            />
                            <div className={style.card__footer}>
                                <div className={style.button}>
                                    {/* <Button disabled={isSubmitting} color={'blue'} border={3} name={'Cохранить'} {...props} /> */}
                                </div>

                                {isChanged && <button
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
        </div>
    )
}





export default ClientForm