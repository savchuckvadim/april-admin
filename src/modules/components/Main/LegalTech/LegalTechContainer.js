import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getLt, ltActions, updateLT } from "../../../redux/reducers/legal-tech/legal-tech-reducer"
import LegalTech from "./LegalTech"


const mapStateToProps = (state) => {

    return {
        legalTech: state.legalTech.filtredLt,
        filters: state.legalTech.filter.filters,
        filterCurrent: state.legalTech.filter.index
    }
}

const LegalTechContainer = (props) => {

    useEffect(() => {
        
        props.getLt()
    }, [])

    
    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        <LegalTech 
        legalTech={props.legalTech} 
        filters={props.filters}
        filterCurrent={props.filterCurrent}
        updateLT={props.updateLT}
        setFilter={props.setFilter}
         />


    )
}


export default connect(mapStateToProps, {
    getLt,
    updateLT,
    setFilter: ltActions.setFilter

})(LegalTechContainer)