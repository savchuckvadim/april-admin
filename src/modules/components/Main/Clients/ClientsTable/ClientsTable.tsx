import * as React from 'react';
import { ClientType } from '../../../../types/types';
import BaseTable, { ClientValueType } from '../../../Elements/BaseTable/BaseTable';






type ClientsTablePropsType = {
  clients: Array<ClientType>
}




const ClientsTable: React.FC<ClientsTablePropsType> = ({clients}) => {
 
  
  let resultClients  = clients.map(c => ({ number: c.number, name: c.name, domain: c.domain, email: c.email, } as ClientValueType))
  let categories = [] as Array<string>
  for (const key in resultClients[0]) {
      if (key !== 'number') categories.push(key)

  }

  return resultClients.length > 0 ? <BaseTable categories={categories} values={resultClients} type={'clients'} withLinks={true} />
  : <div>{`no ${'clients'}`}</div>
 
}

export default ClientsTable