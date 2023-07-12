import * as React from 'react';
import { ContractType, TableTypes } from '../../../types/types';
import ContractsTable from './ContractsTable/ContractsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';





type ContractsTablePropsType = {
  contracts: Array<ContractType>
  isClient?: boolean,
  checked?: Array<number>
  updateContracts?: (token: string) => void


}




const Contracts: React.FC<ContractsTablePropsType> = ({ isClient = false, checked = [], contracts, updateContracts }) => {

  debugger
  return (
    <>
 
      {!isClient && <UploadData upload={updateContracts} />}
      <ContractsTable
        isClient={isClient}
        checked={checked}
        contracts={contracts}
        type={TableTypes.contracts}
      />
    </>

  );
}

export default Contracts