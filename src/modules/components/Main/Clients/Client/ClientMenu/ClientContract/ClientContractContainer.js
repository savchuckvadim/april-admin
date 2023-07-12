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
        if (client.contracts && client.contracts.current && client.contracts.items) {
            contracts = client.contracts.items
            checked = client.contracts.current
        }
    }
    return (
        <Contracts
            isClient={true}
            contracts={contracts}
            checked={checked}
        />
    )
}

export default connect(mapStateToProps, {

})(ClientContractContainer)