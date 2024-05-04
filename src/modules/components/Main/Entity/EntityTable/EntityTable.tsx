import * as React from 'react';
import { SupplyType, TableTypes } from '../../../../types/types';
import BaseTable, { SupplyValueType } from '../../../Elements/BaseTable/BaseTable';
import { Template } from '../../../../types/template-types';
import EntityBaseTable from '../../../Elements/BaseTable/EntityBaseTable';

type EntityTablePropsType = {
    items: Array<SupplyType>
    type: TableTypes
    name: string
    entityItemName: string
}


const EntityTable: React.FC<EntityTablePropsType> = ({ items, type, name, entityItemName }) => {

    let resultItems: Array<SupplyValueType | Template> = items.map(entity => (entity as SupplyValueType | Template))

    let categories = [] as Array<string>


    for (const key in resultItems[0]) {
        //@ts-ignore
        if (typeof resultItems[0][key] === 'number' || typeof resultItems[0][key] === 'string' ||
            //@ts-ignore
            typeof resultItems[0][key] === 'boolean' ||
            //@ts-ignore
            resultItems[0][key] === null
        ) categories.push(key)

    }
    
    //@ts-ignore
    return resultItems.length > 0 ? <EntityBaseTable entityItemName={entityItemName} categories={categories} values={resultItems} type={name} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default EntityTable