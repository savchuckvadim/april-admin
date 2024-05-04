import React from "react"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import Clients from "./Clients"
import { getClients } from "../../../redux/reducers/client/client-reducer"


const mapStateToProps = (state) => {

    return {
        clients: state.client.clients
    }
}



const ClientsContainer = (props) => {




    const [clients, setClients] = useState(null)


    useEffect(() => {

        setClients(props.clients)
    }, [props.clients])

    
    useEffect(() => {
        props.getClients()

    }, [])

    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        clients && <Clients clients={clients} />


    )
}


export default connect(mapStateToProps, {
    getClients
})(ClientsContainer)