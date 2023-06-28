import * as React from 'react';

import { RegionType, TableTypes } from '../../../../types/types';
import BaseTable, { RegionValueType } from '../../../Elements/BaseTable/BaseTable';

type ComplectsTablePropsType = {
    regions: Array<RegionType>
    type: TableTypes
}


const RegionsTable: React.FC<ComplectsTablePropsType> = ({ regions, type, }) => {

    let resultRegions = regions.map(c => ({ number: c.number, title: c.title, abs: c.abs, infoblock: c.infoblock } as RegionValueType))
    let categories = [] as Array<string>
    for (const key in resultRegions[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultRegions.length > 0 ? <BaseTable categories={categories} values={resultRegions} type={'regions'} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default RegionsTable