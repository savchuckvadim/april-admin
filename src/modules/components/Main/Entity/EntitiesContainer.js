import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getEntities, initialAddEntity, updateEntities } from "../../../redux/reducers/entity/entity-reducer"
import Entities from "./Entities"
import Entity from "./Entity"
import { compose } from "redux"


const mapStateToProps = (state, ownProps) => {

    return {
        items: state.entity.items,
        current: state.entity.current,
        name: ownProps.name,
        isItem: ownProps.isItem,
        urlForGet: ownProps.urlForGet,
        entityItemName: ownProps.entityItemName


    }
}

const EntitiesContainer = ({
    items, name,  entityItemName, isItem, urlForGet, 
    getEntityItems, updateEntities, getEntities

}) => {

    useEffect(() => {
        
        urlForGet && name && getEntities(urlForGet, 'get', name)
    }, [])


    return (!isItem
        ? <Entities
            items={items}
            name={name}
            entityItemName={entityItemName}
            getEntityItems={getEntityItems}
            updateEntities={updateEntities}
        

        />

        : <Entity


        />


    )
}


export default compose(
    connect(
        mapStateToProps, {
        // getEntityItems,
        updateEntities,
        initialAddEntity,
        getEntities
        // setFilter: supplyActions.setFilter

    }))(EntitiesContainer)

