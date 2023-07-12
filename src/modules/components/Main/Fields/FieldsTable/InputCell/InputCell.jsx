import { useState, useEffect } from 'react';
import style from './InputCell.module.scss';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import { Field, Form, Formik, getFieldProps } from 'formik';
import { validate } from '../../../../../utils/Validators/validator-april';
import LoadingPage from '../../../../Elements/Loading/Loading-Page';

const FieldsTableInput = ({ field, submit, label, error, touched, form }) => {

    return <TextField
        type="text"
        align={'right'}
        placeholder={label}
        sx={{ height: 22, width:'85%' }}
        size='small'
        label={label}
        {...field}

        onBlur={(e) => {
            // console.log('e')
            // console.log(e)
            // console.log('on blur -> submit')
            console.log(field.value)
            debugger
            submit && submit(field.value)
        }}

    />

}



const InputCell = ({ field, isEditable, value, type, updateField, clientId }) => {

    const [stateValue, setStateValue] = useState(value);
    const [editable, setEditable] = useState(isEditable);
    const [isUpdating, setIsUpdating] = useState(false)



    const submit = async (value) => {
        debugger
        setIsUpdating(true)
        await updateField(field.number, value, type)
        setIsUpdating(false)
    }

    useEffect(() => {

        setStateValue(value)

    }, [value])

    return (isUpdating
        ? <p className={style.loading}>loading</p>
        : <>
            <TableCell align="right" sx={{ maxHeight: '32px', paddingTop: 1, width: type === 'bitrixId' ? '420px' : '180px' }} >{
                editable

                    ? <div className={style.input__wrapper}>
                        <Field
                            name={`fields.${field.name}.${type}`}
                            submit={submit}
                            component={FieldsTableInput}
                            clientId={clientId}
                            // component={'input'}
                            label={type}
                            // onBlur={(e) => console.log(field)}


                        />
                    </div>

                    : <div className={style.input__wrapper}>
                        <p className={style.cell__value}

                            onDoubleClick={() => {
                                setEditable(!editable)
                            }}

                        > {stateValue} </p>
                    </div>

            }</TableCell>
        </>

    )
}


export default InputCell