import React from 'react'
import { Navigate } from 'react-router-dom'
import { LightLoadingPageContainer } from '../../Elements/Loading/Light-Loading-Page-Container'


import { TemplateAddData, TemplateInitialAddData } from '../../../types/entity-types'
import { SetUpdatingTemplate, Template, TemplateField } from '../../../types/template-types'
import EntityAdd from './EntityAdd/EntityAdd'
import EntityForm from './EntityMenu/EntityForm/EntityForm'


// type redirectType = {
//     status: boolean
//     link: string | null
// }

type EntityPropsType = {
    name: string
    entity: TemplateAddData | Template | TemplateField
    isNew: boolean
    entityId: number | 'add' | false
    isInitializingAdd: boolean
    initialAddEntity: (entityName: string, data: TemplateInitialAddData) => void
    setInitializingAddProcess: () => void
    setUpdatingEntity: (url: string, model: string, data: SetUpdatingTemplate) => void

}




const Entity: React.FC<EntityPropsType> = ({
    name,
    entity,
    isNew,
    // entityId,
    isInitializingAdd,
    initialAddEntity,
    setInitializingAddProcess,
    setUpdatingEntity


}) => {

    let targetEntity = entity
    if (isNew && isInitializingAdd) {
        if (name == 'template') {
            targetEntity = entity as TemplateAddData
        } else if (name == 'field') {
            targetEntity = entity as TemplateField
        }

    } else {
        targetEntity = entity as Template
    }


    return (
        !entity
            ? <LightLoadingPageContainer />
            : isNew && isInitializingAdd
                ? <EntityAdd
                    name={name}
                    //@ts-ignore
                    fields={targetEntity.fields}
                    //@ts-ignore
                    parameters={targetEntity.parameters}

                    setUpdatingEntity={setUpdatingEntity}
                />

                : <EntityForm
                    name={name}
                    //@ts-ignore
                    entity={targetEntity}


                />



    )
}

export default Entity