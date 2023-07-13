import * as React from 'react';
import { ContractType, TableTypes } from '../../../types/types';
import ContractsTable from './ContractsTable/ContractsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';





type ContractsTablePropsType = {
  contracts: Array<ContractType>
  isClient?: boolean
  clientId?: number | null
  checked?: Array<number>
  bitrixId: string | null
  updateContracts?: (token: string) => void


}




const Contracts: React.FC<ContractsTablePropsType> = ({ isClient = false,clientId, checked = [], contracts, updateContracts }) => {


  return (
    <>

      {!isClient && <UploadData upload={updateContracts} />}
      <ContractsTable
        isClient={isClient}
        clientId={clientId}
        checked={checked}
        contracts={contracts}
        type={TableTypes.contracts}
      />
    </>

  );
}

export default Contracts