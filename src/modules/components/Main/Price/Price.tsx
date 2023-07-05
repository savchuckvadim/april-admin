import * as React from 'react';
import { PriceType, TableTypes } from '../../../types/types';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
import PriceTable from './PriceTable/PriceTable';



// type ComePricesType = {
//     //    coefficients: Array<number>
//        prof: {
//         msk: {
//             internet: Array<PriceType>
//             proxima: Array<PriceType>
//         },
//         regions: {
//             internet: Array<PriceType>
//             proxima: Array<PriceType>
//         }
//     },
// }


type PriceTablePropsType = {
  isClient?: boolean
  prices: Array<PriceType>
  filters: Array<string>
  filterCurrent: number
  updatePrices: (token: string) => void
  setFilter: (index: number) => void
}




const Price: React.FC<PriceTablePropsType> = ({
  isClient, 
  prices, 
  filters, 
  filterCurrent, 
  updatePrices, 
  setFilter 
}) => {

  debugger
let color = isClient ? 'rgb(219, 217, 231)' : 'white'
  return (
    <>
      <Filter 
      //@ts-ignore
      align={'flex-end'} 
      color={color} 
      name={'prices'} 
     
      >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      {!isClient && <UploadData upload={updatePrices} />}
      <PriceTable prices={prices} type={TableTypes.price}  />
    </>
  );

}

export default Price