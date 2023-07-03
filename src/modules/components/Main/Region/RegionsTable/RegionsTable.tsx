import * as React from 'react';

import { RegionType, TableTypes } from '../../../../types/types';
import BaseTable, { RegionValueType } from '../../../Elements/BaseTable/BaseTable';

type RegionTablePropsType = {
    isClient: boolean
    clientRegions?: Array<number>
    regions: Array<RegionType>
    type: TableTypes
    updateClientRegions: (regionId: number, checked: boolean) => void
}


const RegionsTable: React.FC<RegionTablePropsType> = ({ isClient, regions, type, clientRegions, updateClientRegions }) => {

    let resultRegions = regions.map(c => ({ number: c.number, title: c.title, abs: c.abs, infoblock: c.infoblock } as RegionValueType))
    let categories = [] as Array<string>
    for (const key in resultRegions[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultRegions.length > 0 ? <BaseTable
        categories={categories}
        values={resultRegions}
        type={'regions'}
        withLinks={true}
        clientRegions={clientRegions}
        isClient={isClient}
        updateClientRegions={updateClientRegions}
    />
        : <div>{`no ${type}`}</div>
}


export default RegionsTable