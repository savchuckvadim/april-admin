import * as React from 'react';
import { ContractType, TableTypes } from '../../../types/types';
import ContractsTable from './ContractsTable/ContractsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';







type ComplectsTablePropsType = {
  contracts: Array<ContractType>
  updateContracts: (token: string) => void


}




const Contracts: React.FC<ComplectsTablePropsType> = ({ contracts, updateContracts }) => {



  return (
    <>
      <UploadData upload={updateContracts} />
      <ContractsTable contracts={contracts} type={TableTypes.contracts} />
    </>

  );
}

export default Contracts