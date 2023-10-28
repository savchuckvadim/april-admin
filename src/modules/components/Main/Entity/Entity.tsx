import React from 'react'
import { Navigate } from 'react-router-dom'
import { LightLoadingPageContainer } from '../../Elements/Loading/Light-Loading-Page-Container'
import EntityForm from './EntityMenu/EntityForm/EntityForm'
import { ClientType } from '../../../types/types'


type redirectType = {
    status: boolean
    link: string | null
}

type ClientPropsType = {
    client: ClientType
    // clientId: number | 'new' | false
    redirect: redirectType
    deleteRedirect: () => void
    sendNewClient: (name: string, email: string, domain: string) => void
    updateClient: (client: ClientType) => void
    updateField: (fieldNumber: number, value: string, type: 'value' | 'bitrixId') => void
    updateClientProducts: (clientId: number) => void
    getProducts: (clientId: number) => void
}




const Entity: React.FC<ClientPropsType> = ({
    client,
    redirect,
    deleteRedirect,
    sendNewClient,
    updateClient,
    updateField,
    updateClientProducts,
    getProducts,

}) => {

    if (redirect) {

        deleteRedirect()

        return <Navigate replace to={`../../clients/${redirect}`} />

    }



    return (
        !client
            ? <LightLoadingPageContainer />
            : <EntityForm
                client={client}

                // formikInitialValues={formikInitialValues}
                
                sendNewClient={sendNewClient}
                updateClient={updateClient}
                updateField={updateField}
                updateClientProducts={updateClientProducts}
                getProducts={getProducts}

            />

    )
}

export default Entity