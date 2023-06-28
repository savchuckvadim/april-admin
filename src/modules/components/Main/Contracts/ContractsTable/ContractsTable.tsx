import * as React from 'react';

import { ContractType, TableTypes } from '../../../../types/types';
import BaseTable, { ContractValueType } from '../../../Elements/BaseTable/BaseTable';

type ComplectsTablePropsType = {
    contracts: Array<ContractType>
    type: TableTypes
}


const ContractsTable: React.FC<ComplectsTablePropsType> = ({ contracts, type, }) => {

    let resultcontracts  = contracts.map(c => ({ number: c.number, name: c.aprilName, mesureName: c.mesureName, bitrixName: c.bitrixName, } as ContractValueType))
    let categories = [] as Array<string>
    for (const key in resultcontracts[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultcontracts.length > 0 ? <BaseTable categories={categories} values={resultcontracts} type={'contracts'} withLinks={false} />
        : <div>{`no ${type}`}</div>
}


export default ContractsTable