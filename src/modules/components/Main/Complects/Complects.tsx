import * as React from 'react';

import { ComplectType, TableTypes } from '../../../types/types';
import ComplectsTable from './ComplectsTable/ComplectsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type ComplectsTablePropsType = {
  complects: Array<ComplectType>
  filters: Array<string>
  filterCurrent: number
  updateComplects: (token: string) => void
  setFilter: (index: number) => void
}




const Complects: React.FC<ComplectsTablePropsType> = ({ complects, filters, filterCurrent, updateComplects, setFilter }) => {



  return (
    <>
      <Filter name={'clients'} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      <UploadData upload={updateComplects} name={'clients'} />
      <ComplectsTable complects={complects} type={TableTypes.complects} />
    </>

  );
}

export default Complects