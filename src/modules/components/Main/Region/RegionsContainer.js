import React, { useEffect } from "react"
import { connect } from "react-redux"

import { getFilter, getRegions, updateRegions } from "../../../redux/reducers/region/region-reducer"
import Regions from "./Regions"


const mapStateToProps = (state, ownProps) => {

    return {
        regions: state.region.regions,
        filters: state.region.filter.filters,
        filterCurrent: state.region.filter.index,
        isClient: ownProps.isClient

    }
}

const RegionsContainer = ({
    isClient,
    regions,
    filters,
    filterCurrent,
    getRegions,
    updateRegions
}) => {

    useEffect(() => {
        if (regions.length < 1) {
            getRegions()
        }

    }, [])


    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        <Regions
            isClient={isClient}
            regions={regions}
            filters={filters}
            filterCurrent={filterCurrent}
            updateRegions={updateRegions}
            getFilter={getFilter}

        />


    )
}


export default connect(mapStateToProps, {
    getRegions,
    updateRegions,
    getFilter


})(RegionsContainer)