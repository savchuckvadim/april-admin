import * as React from 'react';
import { PriceType, TableTypes } from '../../../types/types';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
import PriceTable from './PriceTable/PriceTable';



type ComePricesType = {
    //    coefficients: Array<number>
       prof: {
        msk: {
            internet: Array<PriceType>
            proxima: Array<PriceType>
        },
        regions: {
            internet: Array<PriceType>
            proxima: Array<PriceType>
        }
    },
}


type PriceTablePropsType = {
  prices: Array<PriceType>
  filters: Array<string>
  filterCurrent: number
  updatePrices: (token: string) => void
  setFilter: (index: number) => void
}




const Price: React.FC<PriceTablePropsType> = ({ prices, filters, filterCurrent, updatePrices, setFilter }) => {

debugger

  return (
    <>
      <Filter name={'prices'} callback={() => { alert('prices') }} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      <UploadData upload={updatePrices} />
      <PriceTable prices={prices} type={TableTypes.price} />
    </>
  );

}

export default Price