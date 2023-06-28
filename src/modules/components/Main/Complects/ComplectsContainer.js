import React, { useEffect } from "react"
import { connect } from "react-redux"
import Complects from "./Complects"
import { complectActions, getComplects, updateComplects } from "../../../redux/reducers/complect/complect-reducer"


const mapStateToProps = (state) => {

    return {
        complects: state.complect.filtredComplects,
        filters: state.complect.filter.filters,
        filterCurrent: state.complect.filter.index
    }
}

const ComplectsContainer = (props) => {

    useEffect(() => {
        props.getComplects()
    }, [])

    
    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        <Complects 
        complects={props.complects} 
        filters={props.filters}
        filterCurrent={props.filterCurrent}
        updateComplects={props.updateComplects}
        setFilter={props.setFilter}
         />


    )
}


export default connect(mapStateToProps, {
    getComplects,
    updateComplects,
    setFilter: complectActions.setFilter

})(ComplectsContainer)