import { TextField } from '@mui/material';
import { FieldProps, FormikProps } from 'formik';


interface ClientGeneralInputProps extends FieldProps {
    form: FormikProps<any>;  // Используйте ваш конкретный тип вместо any
    error?: boolean | undefined;
    touched?: boolean;
    setClientName?: (name: string) => void
}



const ClientGeneralInput: React.FC<ClientGeneralInputProps> = ({ field, error, touched, form, setClientName }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let maxChars = 30; // Максимальное количество символов
        if (field.name == 'domain') {
            maxChars = 63
        }
        if (value.length <= maxChars) {
            form.setFieldValue(name, value);
        }
        if (name === 'name') {
            if (setClientName) {
                setClientName(value)
            }

        }
    };
    return <TextField
        error={error && touched && true}
        type="text"
        //@ts-ignore
        // value={field.value}

        placeholder={field.name}
        sx={{ height: 22 }}
        size='small'
        // label={field.name}
        {...field}
        onChange={handleInputChange}
        // @ts-ignore
        setClientName={setClientName && setClientName}

    />

}

export default ClientGeneralInput