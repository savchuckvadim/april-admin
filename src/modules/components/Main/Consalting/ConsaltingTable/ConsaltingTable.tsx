import * as React from 'react';
import { ConsaltingType, TableTypes } from '../../../../types/types';
import BaseTable, { ConsaltingValueType, SupplyValueType } from '../../../Elements/BaseTable/BaseTable';

type SupplyTablePropsType = {
    consalting: Array<ConsaltingType>
    type: TableTypes
}


const ConsaltingTable: React.FC<SupplyTablePropsType> = ({ consalting, type, }) => {
    
    let resultconsalting: Array<ConsaltingValueType> = consalting.map(c => ({ number: c.number, name: c.name, contractProp: c.contractProp, contractComment: c.contractComment, } as ConsaltingValueType))
    let categories = [] as Array<string>
    for (const key in resultconsalting[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultconsalting.length > 0 ? <BaseTable categories={categories} values={resultconsalting} type={'complects'} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default ConsaltingTable