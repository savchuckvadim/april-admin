import React from "react"
import { connect } from "react-redux"
import Client from "./Client"
import { clientActions, getClient, getProducts, sendNewClient, setCreatingClient, updateClientField } from "../../../../redux/reducers/client/client-reducer"
import { updateClientProducts } from "../../../../redux/reducers/product/product-reducer"


import { useEffect, useState } from "react"
import { compose } from "redux"
import WithRouter from "../../../HOC/WithRouter"
import { updateField } from "../../../../redux/reducers/field/field-reducer"
import { Navigate } from "react-router-dom"



const mapStateToProps = (state) => {
    
    return {
        client: state.client.current,
        redirect: state.client.redirect,
        preloader: state.preloader.component.inProgress
    }
}

const ClientContainer = (props) => {




    const [currentClient, setCurrentClient] = useState(null)
    const [clientId, setClientId] = useState(null)
    // const [redirect, setRedirect] = useState({ status: false, link: null })

    useEffect(() => {
        




        if (!props.redirect) {
            debugger
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
                debugger
                if (props.params.clientId) {
                    console.log('сэтаем новый url в локальное состояние')
                    console.log('и запрашиваем клиента по такому params clientId')
                    debugger
                    setClientId(Number(props.params.clientId))
                    props.getClient(Number(props.params.clientId))
                } else {
                    debugger
                    if(clientId !== 'new'){
                        debugger
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
                        debugger
                        console.log('клиент существующий')
                    console.log('number пришедшего клиента не равен params')
                    console.log('делаем редирект')
                    
                    // setRedirect({
                    //     status:true,
                    //     link: `../../clients/${props.client.number}`

                    // })

                }
                else if (props.client && !props.client.number) {  //если пришел создаваемый клиент
                    debugger
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

    //     useEffect(() => {
    //         console.log(currentClient)
    //         console.log(props.client)
    //         console.log(props.params.clientId)

    // 
    //     }, [props.params.clientId])

    // useEffect(() => {
    //     

    //     if (props.params.clientId) {
    //         
    //         // setClientId(Number(props.params.clientId))
    //         props.getClient(Number(props.params.clientId))


    //     } else {  //если props params отсутствуют значит в url отсутствуют id текущего клиента значит url
    //         
    //         if (!props.client || props.client.number !== null) {
    //             
    //             props.setCreatingClient()
    //             // if (clientId !== 'new') {
    //             //     
    //             //     setClientId('new')
    //             // }
    //         }





    //     }
    // }, [props.params.clientId])



    // useEffect(() => {

    //     /*
    //     1. getClient из-за url
    //     2. setCreated из-за url
    //     3. setCurrent из-за создания клиента - нужен redirect
    //     */
    //     console.log('props.client')
    //     console.log(props.client)
    //     // if(props.client !== currentClient || props.client.number !== currentClient.number){
    //     //     
    //     //     setCurrentClient(props.client)
    //     // }
    //     
    //     setCurrentClient(props.client)
    //     if (!props.params.clientId) {  //создаваемый клиент
    //         console.log(currentClient)
    //         
    //         if (props.client) {    //клиент есть
    //             console.log(currentClient)
    //             
    //             if (props.client.number !== null) { //клиент существующий
    //                 console.log(currentClient)
    //                 setRedirect({
    //                     status: true,
    //                     link: `../../clients/${props.client.number}`
    //                 })
    //                 
    //             } else if (props.client.number === null) {//клиент создаваемый
    //                 
    //                 //все ок clientId и client синхронизированы
    //             }
    //         } else { //если url на создаваемом клиенте, а пришло отсутствие клиента client = null
    //             
    //             console.log(currentClient)
    //             // props.setCreatingClient() //засэтать в стэйт создаваемого клиента
    //         }

    //     } else if (props.params.clientId && props.client) { //если в url клиент id не равно new, но существует - значит url на действующем клиенте
    //         
    //         if (Number(props.params.clientId) !== props.client.number) {
    //             console.log(currentClient)
    //             
    //             setRedirect({
    //                 status: true,
    //                 link: `../../clients/${props.client.number}`
    //             })
    //         }
    //     }

    // }, [])

    // useEffect(() => {
    //     if (redirect) {
    //         setRedirect(false)
    //     }


    // }, [redirect])




    debugger
    if (props.preloader || !props.client) {
        return <div>Loading</div>
    }
    // else if (redirect) {
    //     
    //     let link = redirect

    //     return <Navigate replace to={link} />

    // }
    else {
        debugger
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
        setCreatingClient,
        updateField:updateClientField,
        getClient,
        deleteRedirect: clientActions.deleteRedirect,
        updateClientProducts:updateClientProducts,
        getProducts
    }),
    WithRouter

)(ClientContainer)