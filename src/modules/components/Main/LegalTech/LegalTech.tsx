import * as React from 'react';

import { LegalTechType, TableTypes } from '../../../types/types';
import LegalTechTable from './LegalTechTable/LegalTechTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
import Filter from '../../Elements/Filter/Filter';
import FilterButtons from '../../Elements/Filter/Filter-Buttons/Filter-Buttons';
// import { ClientType } from '../../../../types/types';






type LegalTechTablePropsType = {
  legalTech: Array<LegalTechType>
  filters: Array<string>
  filterCurrent: number
  updateLT: (token: string) => void
  setFilter: (index: number) => void
}




const LegalTech: React.FC<LegalTechTablePropsType> = ({ legalTech, filters, filterCurrent, updateLT, setFilter }) => {



  return (
    <>
      <Filter name={'clients'} callback={() => { alert('Fields') }} >
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      <UploadData upload={updateLT} />
      {legalTech.length > 0 && <LegalTechTable
        legalTech={legalTech}
        type={TableTypes.lt}
      />}
    </>

  );
}

export default LegalTech