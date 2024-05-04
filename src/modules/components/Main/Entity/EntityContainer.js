import React from "react"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import { compose } from "redux"

import Entity from "./Entity"
import { withRouter } from "react-router-dom"
import WithRouter from "../../HOC/WithRouter"
import { entityActions, initialAddEntity, setUpdatingEntity } from "../../../redux/reducers/entity/entity-reducer"




const mapStateToProps = (state, ownProps) => {

    return {
        entity: state.entity.adding,
        preloader: state.preloader.component.inProgress,
        isInitializingAdd: state.entity.isInitializingAdd,
        isNew: ownProps.isNew,
        name: ownProps.name,

    }
}

const EntityContainer = ({
    entity, isNew, name, params, isInitializingAdd,
    initialAddEntity, setInitializingAddProcess, setUpdatingEntity
}) => {



    if (params['*'] === `${name}/add`) {
        console.log('*')
        console.log(params['*'])
    }


    // const [currentClient, setCurrentClient] = useState(null)
    const [entityId, setEntityId] = useState(null)


    useEffect(() => {

        params.entityId && setEntityId(params.entityId)

        // add?

        if (isNew && !isInitializingAdd) {

            initialAddEntity(name)
        }


    }, [entity, params.entityId])







    // if (preloader || !entity) {
    //     return <div>Loading</div>
    // }

    // else {

    return <Entity
        name={name}
        entity={entity}
        isNew={isNew}
        // param={entityId}
        isInitializingAdd={isInitializingAdd}

        //functions
        initialAddEntity={initialAddEntity}
        setInitializingAddProcess={setInitializingAddProcess}
        setUpdatingEntity={setUpdatingEntity}

    />
    // }

}


export default compose(
    connect(mapStateToProps, {
        setInitializingAddProcess: entityActions.setInitializingAddProcess,
        initialAddEntity,
        setUpdatingEntity,
    }),
    WithRouter

)(EntityContainer)