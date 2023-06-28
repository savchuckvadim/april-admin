import * as React from 'react';

import { ComplectType, RegionType, TableTypes } from '../../../types/types';
import RegionsTable from './RegionsTable/RegionsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type ComplectsTablePropsType = {
  regions: Array<RegionType> 
  updateRegions: (token: string) => void
 
}




const Regions: React.FC<ComplectsTablePropsType> = ({ regions,  updateRegions }) => {

  

  return (
    <>
      {/* <Filter name={'clients'} callback={() => { alert('Fields') }} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter> */}
      <UploadData upload={updateRegions} />
      <RegionsTable regions={regions} type={TableTypes.regions} />
    </>

  );
}

export default Regions