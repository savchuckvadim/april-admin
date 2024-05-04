import Checkbox from "@mui/material/Checkbox";


const FormCheckbox = ({ field, submit, label, error, touched, form }) => {
    

    const onCheck = (event) => {
        const ch = event.target.checked;
        
        form.setFieldValue(field.name, ch)
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row'
    }}>

        <Checkbox
            // type="number"
            align={'right'}
            placeholder={label}
            // sx={{ height: 22, width: '85%' }}
            // size='small'
            label={field.name}
            {...field}
            checked={field.value}
            // onBlur={(e) => {
                // console.log('e')
                // console.log(e)
                // console.log('on blur -> submit')
                // console.log(field.value)

                // submit && submit(field.value, form.values)
            // }}
            // onChange={form.onChange}

        />
        <p>{field.name}</p>
    </div>

}


export default FormCheckbox