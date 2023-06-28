import * as React from 'react';

import { LegalTechType, TableTypes } from '../../../../types/types';
import BaseTable, { ComplectValueType, LegalTechValueType } from '../../../Elements/BaseTable/BaseTable';

type LegalTechTablePropsType = {
    legalTech: Array<LegalTechType>
    type: TableTypes
}


const LegalTechTable: React.FC<LegalTechTablePropsType> = ({ legalTech, type, }) => {



    let resultlegalTech = legalTech.map(lt => {
        if (lt.type === 'lt') {
            return {
                number: lt.number, name: lt.name, weight: lt.weight, type: lt.type,
            } as LegalTechValueType
        } else {
            return {
                number: lt.number, name: lt.name, weight: lt.weight, type: lt.type,msk:lt.msk,regions:lt.regions,
            } as LegalTechValueType
        }

    })
        let categories = [] as Array<string>
    for (const key in resultlegalTech[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultlegalTech.length > 0 ? <BaseTable categories={categories} values={resultlegalTech} type={'legalTech'} withLinks={true} />
        : <div>{`no ${type}`}</div>
}


export default LegalTechTable