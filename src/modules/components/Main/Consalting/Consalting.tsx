import * as React from 'react';

import { ConsaltingType, ProductType, TableTypes } from '../../../types/types';
import ConsaltingTable from './ConsaltingTable/ConsaltingTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
// import { ClientType } from '../../../../types/types';






type ClientsTablePropsType = {
  consalting: Array<ConsaltingType>
  updateConsalting: (token: string) => void
}




const Consalting: React.FC<ClientsTablePropsType> = ({ consalting, updateConsalting }) => {


  
  return (
    <>
      <UploadData upload={updateConsalting} />
      {consalting.length > 0 && <ConsaltingTable consalting={consalting} type={TableTypes.consalting} />}
    </>

  );
}

export default Consalting