import React, { useEffect } from "react"
import { connect } from "react-redux"

import { getRegions, updateRegions } from "../../../redux/reducers/region/region-reducer"
import Regions from "./Regions"


const mapStateToProps = (state) => {

    return {
        regions: state.region.regions,
        
    }
}

const RegionsContainer = (props) => {

    useEffect(() => {
        props.getRegions()
    }, [])

    
    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        <Regions
        regions={props.regions} 
        
        updateRegions={props.updateRegions}
   
         />


    )
}


export default connect(mapStateToProps, {
    getRegions,
    updateRegions,
   

})(RegionsContainer)