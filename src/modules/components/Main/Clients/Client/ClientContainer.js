import React from "react"
import { connect } from "react-redux"
import Client from "./Client"
import { clientActions, getClient, getProducts, sendNewClient, setCreatingClient, updateClient, updateClientField } from "../../../../redux/reducers/client/client-reducer"
import { updateClientProducts } from "../../../../redux/reducers/product/product-reducer"
import { useEffect, useState } from "react"
import { compose } from "redux"
import WithRouter from "../../../HOC/WithRouter"




const mapStateToProps = (state, ownProps) => {

    return {
        client: state.client.current,
        redirect: state.client.redirect,
        preloader: state.preloader.component.inProgress,
        isNew: ownProps.isNew
    }
}

const ClientContainer = (props) => {

    console.log('client container props')
    console.log(props)
    if (props.params['*'] === 'clients/add') {
        console.log('*')
        console.log(props.params['*'])
    }


    const [currentClient, setCurrentClient] = useState(null)
    const [clientId, setClientId] = useState(null)
    // const [redirect, setRedirect] = useState({ status: false, link: null })

    useEffect(() => {





        if (!props.redirect) {
          
            if (clientId !== Number(props.params.clientId)) { //пришел новый url

                if (clientId === 'new' && props.params.clientId) {

                    //было создание  - пришел существующий
                } else if ((clientId && clientId !== 'new' && !props.params.clientId)) {
                    //был существующий - пришло создание

                } else {

                }
                console.log('пришел новый url')
                console.log(props.params.clientId)
                console.log(clientId)
                console.log('новый url не такой как старый')
               
                if (props.params.clientId) {
                    console.log('сэтаем новый url в локальное состояние')
                    console.log('и запрашиваем клиента по такому params clientId')
                  
                    setClientId(Number(props.params.clientId))
                    props.getClient(Number(props.params.clientId))
                } else {
                   
                    if (clientId !== 'new') {
                     
                        setClientId('new')
                        props.setCreatingClient()
                    }


                }





            }



            if ((props.client && currentClient && currentClient.number !== props.client.number) || (!currentClient && props.client)) { //пришел новый клиент
                console.log('пришел новый клиент')
                console.log(props.client)
                console.log(currentClient)
                setCurrentClient(props.client)

                if (props.client && props.client.number   //если пришел существующий клиент

                    && props.client.number !== Number(props.params.clientId)) { //и его номер не соответстует url
                    
                    console.log('клиент существующий')
                    console.log('number пришедшего клиента не равен params')
                    console.log('делаем редирект')

                    // setRedirect({
                    //     status:true,
                    //     link: `../../clients/${props.client.number}`

                    // })

                }
                else if (props.client && !props.client.number) {  //если пришел создаваемый клиент
                    
                }





            }



            // if (props.params.clientId) {

            //     // if (!props.client || props.client.number !== Number(props.params.clientId))
            //     
            //     // setClientId(Number(props.params.clientId))
            //     props.getClient(Number(props.params.clientId))


            // } else {  //если props params отсутствуют значит в url отсутствуют id текущего клиента значит url
            //     
            //     if (!props.client || props.client.number !== null) {
            //         
            //         props.setCreatingClient()
            //         // if (clientId !== 'new') {
            //         //     
            //         //     setClientId('new')
            //         // }
            //     }






            // } 
        }




    }, [props.client, props.params.clientId])






    
    if (props.preloader || !props.client) {
        return <div>Loading</div>
    }
    // else if (redirect) {
    //     
    //     let link = redirect

    //     return <Navigate replace to={link} />

    // }
    else {
        
        return <Client
            client={props.client}

            redirect={props.redirect}
            deleteRedirect={props.deleteRedirect}

            {...props}
        />
    }

}


export default compose(
    connect(mapStateToProps, {
        sendNewClient,
        updateClient,
        setCreatingClient,
        updateField: updateClientField,
        getClient,
        deleteRedirect: clientActions.deleteRedirect,
        updateClientProducts: updateClientProducts,
        getProducts,

    }),
    WithRouter

)(ClientContainer)