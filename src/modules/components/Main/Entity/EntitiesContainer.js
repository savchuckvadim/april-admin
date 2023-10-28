import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getEntityItems, updateEntities } from "../../../redux/reducers/entity/entity-reducer"
import Entities from "./Entities"
import Entity from "./Entity"


const mapStateToProps = (state, ownProps) => {

    return {
        items: state.entity.items,
        current: state.entity.current,
        name: ownProps.name,
        isItem: ownProps.isItem,
        
        // filters: state.supply.filter.filters,
        // filterCurrent: state.supply.filter.index
    }
}

const EntitiesContainer = ({
    items, name, isItem,
    getEntityItems, updateEntities

}) => {

    useEffect(() => {
        getEntityItems()
    }, [])


    return (!isItem
        ? <Entities
            items={items}
            name={name}
            getEntityItems={getEntityItems}
            updateEntities={updateEntities}

        />

        : <Entity


        />


    )
}


export default connect(mapStateToProps, {
    getEntityItems,
    updateEntities,
    // setFilter: supplyActions.setFilter

})(EntitiesContainer)