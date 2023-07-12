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
    if (client) {
        if (client && client.current && client.current.contracts && client.current.contracts.current && client.current.contracts.items) {
            contracts = client.current.contracts.items
            checked = client.current.contracts.current
        }
    }
    debugger
    return (
        <Contracts
            isClient={true}
            contracts={contracts}
            checked={checked}
        />
    )
}

export default connect(mapStateToProps, {

    //todo
    //update client-contracts
    //update client-contracts-current
    //update client-contract - prop
    
})(ClientContractContainer)