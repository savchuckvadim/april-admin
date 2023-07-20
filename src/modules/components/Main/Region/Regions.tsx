import * as React from 'react';

import { ClientRegionType, RegionType, TableTypes } from '../../../types/types';
import RegionsTable from './RegionsTable/RegionsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type ComplectsTablePropsType = {
  isClient: boolean,
  clientRegions: Array<ClientRegionType>
  regions: Array<RegionType>
  filters: Array<string>
  filterCurrent: number
  updateRegions: (token: string) => void
  getFilter: (filterIndex: number) => void
  updateClientRegions: (regionId: number, checked: boolean) => void
}




const Regions: React.FC<ComplectsTablePropsType> = ({
  isClient,
  clientRegions,
  regions,
  filters,
  filterCurrent,
  updateRegions,
  getFilter,
  updateClientRegions
 }) => {



  return (
    <>
      <Filter name={'regions'} >
        <FilterButtons actions={filters} filter={(index: number) => getFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      {!isClient && <UploadData upload={updateRegions} />}
      <RegionsTable
        regions={regions}
        type={TableTypes.regions}
        isClient={isClient}
        clientRegions={clientRegions}
        updateClientRegions={updateClientRegions}
      />
    </>

  );
}

export default Regions