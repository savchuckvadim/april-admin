import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import style from './ProductsTable.module.scss';
import { ProductType } from '../../../../types/types';

type ClientsTablePropsType = {
    products: Array<ProductType>
  }


const ProductsTable: React.FC<ClientsTablePropsType> = ({products}) => {
 
    return (

        <TableContainer sx={{ borderRadius: 2 }} component={Paper} className={style.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        {/* <TableCell align="right">ID</TableCell> */}
                        <TableCell>Name </TableCell>
                        <TableCell align="right">Supply</TableCell>
                        <TableCell align="right">Contract</TableCell>
                        <TableCell align="right">Consalting</TableCell>
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, i) => (

                        <TableRow
                            key={`${row.name}-${i}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            {/* <TableCell align="right">{row.id}</TableCell> */}
                            <TableCell component="th" scope="row">
                                <NavLink to={`../products/${row.number}`}>
                                    {row.name}
                                </NavLink>
                            </TableCell>
                            <TableCell align="right">{row.supplyType}</TableCell>
                            <TableCell align="right">{row.contractName}</TableCell>
                            <TableCell align="right">{row.complectNumber}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default ProductsTable