import * as React from 'react';

import {  SupplyType, TableTypes } from '../../../types/types';
import EntityTable from './EntityTable/EntityTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
// import Filter from '../../Elements/Filter/Filter';
// import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type EntitiesPropsType = {
  items: Array<SupplyType>        // | Array<ClientType>  ...
  name: string

  // filters: Array<SupplyFilterEnum>
  // filterCurrent: 0 | 1 | 2

  getEntityItems: () => void
  updateEntities: (token: string, entityName: string) => void
  setFilter: (index: number) => void
}




const Entities: React.FC<EntitiesPropsType> = ({ items, name,
  getEntityItems, updateEntities }) => {

debugger

  return (
    <>
      {/* <Filter align={false} name={'supply'} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter> */}
      <UploadData upload={updateEntities} name={name} />
      <EntityTable items={items} type={TableTypes.supply} />
    </>

  );
}

export default Entities