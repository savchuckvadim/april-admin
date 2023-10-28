import * as React from 'react';

import { ClientRegionType, RegionType, TableTypes } from '../../../../types/types';
import BaseTable, { RegionValueType } from '../../../Elements/BaseTable/BaseTable';

type RegionTablePropsType = {
    isClient: boolean
    clientRegions?: Array<ClientRegionType>
    regions: Array<RegionType>
    type: TableTypes
    updateClientRegions: (regionId: number, checked: boolean) => void
}


const RegionsTable: React.FC<RegionTablePropsType> = ({ isClient, regions, type, clientRegions, updateClientRegions }) => {


    let resultRegions = regions.map(r => {
        let abs = r.abs
        if (isClient && clientRegions) {
            let clientRegion = clientRegions.find(cr => cr.regionNumber === r.number)
            
            if (clientRegion && clientRegion.isOwnAbs && clientRegion.ownAbs) {
                abs = clientRegion.ownAbs
            }
        }




        return {
            number: r.number,
            title: r.title,
            abs,
            infoblock: r.infoblock
        } as RegionValueType
    })


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