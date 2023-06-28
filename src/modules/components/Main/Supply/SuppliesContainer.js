import React, { useEffect } from "react"
import { connect } from "react-redux"
import Supplies from "./Supplies"
import { getSupplies, supplyActions, updateSupplies } from "../../../redux/reducers/supply/supply-reducer"


const mapStateToProps = (state) => {

    return {
        supplies: state.supply.filtredSupplies,
        filters: state.supply.filter.filters,
        filterCurrent: state.supply.filter.index
    }
}

const SuppliesContainer = (props) => {

    useEffect(() => {
        props.getSupplies()
    }, [])

   
    return (

        <Supplies 
        supplies={props.supplies} 
        filters={props.filters}
        filterCurrent={props.filterCurrent}
        updateSupplies={props.updateSupplies}
        setFilter={props.setFilter}
         />


    )
}


export default connect(mapStateToProps, {
    getSupplies,
    updateSupplies,
    setFilter: supplyActions.setFilter

})(SuppliesContainer)