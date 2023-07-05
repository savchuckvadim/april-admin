import * as React from 'react';

import { SupplyFilterEnum, SupplyType, TableTypes } from '../../../types/types';
import SupplyTable from './SupplyTable/SupplyTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type SuppliesPropsType = {
  supplies: Array<SupplyType>
  filters: Array<SupplyFilterEnum>
  filterCurrent: 0 | 1 | 2
  updateSupplies: (token: string) => void
  setFilter: (index: number) => void
}




const Supplies: React.FC<SuppliesPropsType> = ({ supplies, filters, filterCurrent, updateSupplies, setFilter }) => {



  return (
    <>
      <Filter align={false} name={'supply'} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      <UploadData upload={updateSupplies} />
      <SupplyTable supplies={supplies} type={TableTypes.supply} />
    </>

  );
}

export default Supplies