import * as React from 'react';

import { ComplectType, TableTypes } from '../../../../types/types';
import BaseTable, { ComplectValueType } from '../../../Elements/BaseTable/BaseTable';

type ComplectsTablePropsType = {
    complects: Array<ComplectType>
    type: TableTypes
}


const ComplectsTable: React.FC<ComplectsTablePropsType> = ({ complects, type, }) => {

    let resultComplects  = complects.map(c => ({ number: c.number, name: c.name, weight: c.weight, type: c.type, } as ComplectValueType))
    let categories = [] as Array<string>
    for (const key in resultComplects[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultComplects.length > 0 ? <BaseTable categories={categories} values={resultComplects} type={'complects'} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default ComplectsTable