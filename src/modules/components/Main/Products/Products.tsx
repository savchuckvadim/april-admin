import * as React from 'react';

import { ConsaltingType, ProductType } from '../../../types/types';
import ProductsTable from './ProductsTable/ProductsTable';
import UploadData from '../../Elements/Actions/Upload/UploadData';
// import { ClientType } from '../../../../types/types';






type ClientsTablePropsType = {
  products: Array<ProductType>
  // consalting: ConsaltingType
  updateProducts: (token: string) => void
}




const Products: React.FC<ClientsTablePropsType> = ({ products, updateProducts }) => {

  // let resultProducts = [] as Array<ProductType>

  // for (const complectType in products) {

  //   for (const contractType in products[complectType]) {
  //     //@ts-ignore
      
  //      products[complectType][contractType].forEach(product => {
  //       resultProducts.push(product)
  //      });
  //   }

  // }

  return (
    <>
      <UploadData upload={updateProducts} name={'products'} />
      <ProductsTable products={products} />
    </>

  );
}

export default Products