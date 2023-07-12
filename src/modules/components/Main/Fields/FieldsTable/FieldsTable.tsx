import * as React from 'react';
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import style from './FieldsTable.module.scss';
import { TextField } from '@mui/material';
import InputCell from './InputCell/InputCell';
import { FieldType } from '../../../../types/types';
import { Field, Form, Formik } from 'formik';
import { validate } from '../../../../utils/Validators/validator-april';
import Button from '../../../Elements/Button/Button';

type FieldsPropsType = {
  fields: Array<FieldType>
  clientId: number | null
  updateField: (fieldNumber: number, value: string, type: 'value' | 'bitrixId') => void
}




const FieldsTable: React.FC<FieldsPropsType> = ({ fields, updateField, clientId}) => {


  const [rows, setRows] = useState([] as Array<FieldType>)
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // let result = fields.map(field => {
    //   return createData(field)
    // })

    setRows(fields)
    setLoading(false);
  }, [fields])



  if (loading) {
    return <p className={style.preloader}>Loading...</p>;
  }



  return (
    <>

      <TableContainer sx={{ borderRadius: 2, boxShadow: 'none' }} component={Paper} className={style.table}>
        <Table sx={{ minWidth: '740px', }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ height: '22px' }}>

              <TableCell sx={{ maxHeight: '22px', padding: 0.9, pr: 2 }}>Name </TableCell>
              <TableCell sx={{ maxHeight: '22px', padding: 0.9, pr: 2 }} align="right">bitrixId</TableCell>
              <TableCell sx={{ maxHeight: '22px', padding: 0.9, pr: 2 }} align="right">value</TableCell>


            </TableRow>
          </TableHead>
          <TableBody >

            {rows.map((row, i) => {
              return <TableRow
                key={`fields-${row.name}-${i}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ maxHeight: '22px', padding: 0.9, width: '210px' }} component="th" scope="row">
                  <p>{row.rName}</p>

                </TableCell>

                <InputCell clientId={clientId} updateField={updateField} field={row} isEditable={row.isEditableBitrix} value={row.bitrixId} type={'bitrixId'} />
                <InputCell clientId={clientId} updateField={updateField} field={row} isEditable={row.isEditableValue} value={row.value} type={'value'} />

              </TableRow>
            })}

          </TableBody>
        </Table>

      </TableContainer>

    </>
  );
}




export default FieldsTable