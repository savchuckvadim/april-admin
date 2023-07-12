import * as React from 'react';
import { ContractType, TableTypes } from '../../../types/types';
import ContractsTable from './ContractsTable/ContractsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';







type ComplectsTablePropsType = {
  contracts: Array<ContractType>
  isClient?: boolean,
  checked? : Array<number>
  updateContracts?: (token: string) => void


}




const Contracts: React.FC<ComplectsTablePropsType> = ({isClient = false, checked = [], contracts, updateContracts }) => {


  return (
    <>
      {updateContracts && <UploadData upload={updateContracts} />}
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