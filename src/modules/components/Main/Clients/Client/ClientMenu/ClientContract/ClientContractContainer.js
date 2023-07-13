import { connect } from "react-redux"
import Contracts from "../../../../Contracts/Contracts"



const mapStateToProps = (state) => {

    return {
        client: state.client
    }

}


const ClientContractContainer = ({ client }) => {
    let contracts = []
    let checked = []
    let bitrixId = null
    let clientId = null
    if (client) {
        if (client && client.current && client.current.contracts && client.current.contracts.current && client.current.contracts.items) {
            contracts = client.current.contracts.items
            checked = client.current.contracts.current
            clientId = client.current.number
            bitrixId = client.current.contracts.bitrixId
        }
    }
    
    return (
        <Contracts
            isClient={true}
            clientId={clientId}
            contracts={contracts}
            checked={checked}
            bitrixId={bitrixId}
        />
    )
}

export default connect(mapStateToProps, {

    //todo
    //update client-contracts
    //update client-contracts-current
    //update client-contract - prop

})(ClientContractContainer)