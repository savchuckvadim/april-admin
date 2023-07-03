import React, { useEffect } from "react"
import { connect } from "react-redux"

import { getFilter, getRegions, updateRegions } from "../../../redux/reducers/region/region-reducer"
import Regions from "./Regions"
import { updateClientRegions } from "../../../redux/reducers/client/client-reducer"


const mapStateToProps = (state, ownProps) => {

    return {
        regions: state.region.regions,
        filters: state.region.filter.filters,
        filterCurrent: state.region.filter.index,
        isClient: ownProps.isClient,
        currentClient: state.client.current,


    }
}

const RegionsContainer = ({
    isClient,
    currentClient,
    regions,
    filters,
    filterCurrent,
    getRegions,
    updateRegions,
    updateClientRegions,
    
}) => {
    let clientRegions = []
    if (currentClient && currentClient.regions) {
        clientRegions = currentClient.regions
    }

    useEffect(() => {
        if (regions.length < 1) {
            getRegions()
        }

    }, [regions])


    //todo передать в Client готового клиента или пустого или существующего , сделать все запросы и всю грязь
    return (

        <Regions
            isClient={isClient}
            clientRegions={clientRegions}
            regions={regions}
            filters={filters}
            filterCurrent={filterCurrent}
            updateRegions={updateRegions}
            getFilter={getFilter}
            updateClientRegions={updateClientRegions}

        />


    )
}


export default connect(mapStateToProps, {
    getRegions,
    updateRegions,
    getFilter,
    updateClientRegions


})(RegionsContainer)