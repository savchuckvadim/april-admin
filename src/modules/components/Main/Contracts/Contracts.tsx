import * as React from 'react';
import { ContractType, TableTypes } from '../../../types/types';
import ContractsTable from './ContractsTable/ContractsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';





type ContractsPropsType = {
  contracts: Array<ContractType>
  isClient?: boolean
  clientId?: number | null
  checked?: Array<number>
  // bitrixId: string | null
  updateContracts?: (token: string) => void
  updateClientContracts?: (items: Array<ContractType>, current: Array<number>, bitrixId: null) => void

}




const Contracts: React.FC<ContractsPropsType> = ({ isClient = false, clientId, checked = [], contracts, updateContracts, updateClientContracts }) => {


  return (
    <>

      {!isClient && <UploadData upload={updateContracts} />}
      <ContractsTable
        isClient={isClient}
        clientId={clientId}
        checked={checked}
        contracts={contracts}
        updateClientContracts={updateClientContracts}
        type={TableTypes.contracts}
      />
    </>

  );
}

export default Contracts