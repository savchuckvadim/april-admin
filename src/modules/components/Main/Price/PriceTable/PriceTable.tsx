import * as React from 'react';

import { ComplectType, PriceType, TableTypes } from '../../../../types/types';
import BaseTable, { ComplectValueType, PriceValueType } from '../../../Elements/BaseTable/BaseTable';

type PriceTablePropsType = {
    prices: Array<PriceType>
    type: TableTypes
}


const PriceTable: React.FC<PriceTablePropsType> = ({ prices, type, }) => {
debugger
    let resultPrices = prices.map((c, i) => ({ number: i, name: c.complectName, supply: c.supplyName, contract: c.contractName, value: c.price } as PriceValueType))
    let categories = [] as Array<string>
    for (const key in resultPrices[0]) {
        if (key !== 'number') categories.push(key)

    }


    return resultPrices.length > 0 ? <BaseTable categories={categories} values={resultPrices} type={'price'} withLinks={false} />
        : <div>{`no ${type}`}</div>
}


export default PriceTable