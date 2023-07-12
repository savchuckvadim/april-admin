import * as React from 'react';

import { ContractType, TableTypes } from '../../../../types/types';
import BaseTable, { ContractValueType } from '../../../Elements/BaseTable/BaseTable';

type ComplectsTablePropsType = {
    isClient: boolean
    checked?: Array<number>
    contracts: Array<ContractType>
    type: TableTypes
}


const ContractsTable: React.FC<ComplectsTablePropsType> = ({ isClient, checked, contracts, type, }) => {
    debugger

    let resultcontracts = isClient
        ? contracts.map(c => ({ title: c.bitrixId, measureId: c.measureId, itemId: c.itemId, number: c.number, name: c.aprilName, measureName: c.measureName, bitrixName: c.bitrixName, } as ContractValueType))
        : contracts.map(c => ({ number: c.number, name: c.aprilName, measureName: c.measureName, bitrixName: c.bitrixName, } as ContractValueType))
    let categories = [] as Array<string>
    for (const key in resultcontracts[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultcontracts.length > 0 ? <BaseTable categories={categories} values={resultcontracts} type={'contracts'} withLinks={false} />
        : <div>{`no ${type}`}</div>
}


export default ContractsTable