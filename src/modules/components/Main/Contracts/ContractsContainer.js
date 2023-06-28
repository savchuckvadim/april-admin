import { useEffect } from "react"
import { connect } from "react-redux"
import { getContracts, updateContracts } from "../../../redux/reducers/contract/contract-reducer"
import Contracts from "./Contracts"


const mapStateToProps = (state) => {

    return {
        contracts: state.contract.contracts,
    }
}

const ContractsContainer = (props) => {

    useEffect(() => {
        props.getContracts()
    }, [])
    return (

        <Contracts 
        contracts={props.contracts} 
        updateContracts={props.updateContracts}
      
         />


    )
}


export default connect(mapStateToProps, {
    getContracts,
    updateContracts

})(ContractsContainer)