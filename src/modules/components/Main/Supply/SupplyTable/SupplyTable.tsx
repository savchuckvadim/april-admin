import * as React from 'react';
import { SupplyType, TableTypes } from '../../../../types/types';
import BaseTable, { SupplyValueType } from '../../../Elements/BaseTable/BaseTable';

type SupplyTablePropsType = {
    supplies: Array<SupplyType>
    type: TableTypes
}


const SupplyTable: React.FC<SupplyTablePropsType> = ({ supplies, type, }) => {
    
    let resultSupplies: Array<SupplyValueType> = supplies.map(c => ({ number: c.number, name: c.name, coefficient: c.coefficient, type: c.type, } as SupplyValueType))
    let categories = [] as Array<string>
    for (const key in resultSupplies[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultSupplies.length > 0 ? <BaseTable categories={categories} values={resultSupplies} type={'complects'} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default SupplyTable