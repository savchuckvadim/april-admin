import * as React from 'react';

import { ComplectType, RegionType, TableTypes } from '../../../types/types';
import RegionsTable from './RegionsTable/RegionsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type ComplectsTablePropsType = {
  isClient: boolean
  regions: Array<RegionType>
  filters: Array<string>
  filterCurrent: number
  updateRegions: (token: string) => void
  getFilter: (filterIndex: number) => void

}




const Regions: React.FC<ComplectsTablePropsType> = ({
  isClient,
  regions,
  filters,
  filterCurrent,
  updateRegions,
  getFilter }) => {



  return (
    <>
      <Filter name={'regions'} callback={() => { console.log('regions') }} >
        <FilterButtons actions={filters} filter={(index: number) => getFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      {!isClient && <UploadData upload={updateRegions} />}
      <RegionsTable regions={regions} type={TableTypes.regions} />
    </>

  );
}

export default Regions