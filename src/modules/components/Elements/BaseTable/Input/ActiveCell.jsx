import { useState, useEffect } from 'react';
import style from './ActiveCell.module.scss';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import { Field } from 'formik';


const Input = ({ field, submit, label, error, touched, form }) => {
    debugger
    return <TextField
        type="number"
        align={'right'}
        placeholder={label}
        sx={{ height: 22, width: '85%' }}
        size='small'
        label={label}
        {...field}

        onBlur={(e) => {
            // console.log('e')
            // console.log(e)
            // console.log('on blur -> submit')
            console.log(field.value)
            debugger
            submit && submit(field.value, form.values)
        }}

    />

}



const ActiveCell = ({
    name,
    field,
    isEditable,
    value,
    type,

    clientId,
    updateField,
    updateClientContracts,
    updateClientRegions,
    onCellSubmit
}) => {

    const [stateValue, setStateValue] = useState(value);
    const [editable, setEditable] = useState(isEditable);
    const [isUpdating, setIsUpdating] = useState(false)
    const [fieldValue, setfieldValue] = useState(null)
    const [contracts, setContracts] = useState(null)

    const submit = (value, formvalues) => {
        setContracts(formvalues.contracts)
        setfieldValue([field.number, value, type])
        setIsUpdating(true)

    }

    useEffect(() => {

        setStateValue(value)

    }, [value])

    useEffect(() => {
        debugger
        if (isUpdating) {
            debugger
            if (updateClientContracts) {
                updateClientContracts({ ...contracts })
            }


            if (updateField) {
                updateField([...fieldValue])
            }
            onCellSubmit()
            debugger
            setContracts(null)
            setfieldValue(null)
            setIsUpdating(false)
        }
    }, [isUpdating])

    return (isUpdating
        ? <TableCell className={style.loading}>loading</TableCell>
        : <>
            <TableCell align="right" sx={{ maxHeight: '32px', paddingTop: 1, width: type === 'bitrixId' ? '420px' : '180px' }} >{
                editable

                    ? <div className={style.input__wrapper}>
                        <Field
                            name={name}
                            submit={submit}
                            component={Input}
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


export default ActiveCell