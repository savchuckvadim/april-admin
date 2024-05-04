import { useRef, useState } from "react"
import axios from "axios"
import { Field, FormikErrors, FormikTouched, useField } from "formik"
import { ClientType } from "../../../../../../types/types"
import { ClientFields, ClientSectionEnum } from "./ClientForm"
import ClientGeneral from "../General/ClientGeneral"
import FieldsTable from "../../../../Fields/FieldsTable/FieldsTable"
import style from './ClientMenu.module.scss'
import BaseTable from "../../../../../Elements/BaseTable/BaseTable"
import Button from '../../../../../Elements/Button/Button';
import ProductsTable from "../../../../Products/ProductsTable/ProductsTable"
import RegionsSelectContainer from "../RegionsSelect/RegionsSelectContainer"
import RegionsContainer from "../../../../Region/RegionsContainer"
import PriceContainer from "../../../../Price/PriceContainer"
import { Input } from '@mui/material';
import { Navigate } from "react-router-dom"
import ContractsContainer from "../../../../Contracts/ContractsContainer"
import ClientContractContainer from "../ClientContract/ClientContractContainer"
import { onlineAPI } from "../../../../../../services/april-online-api/online-api"

export const testapi = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api',
    // baseURL: ' http://localhost:8000/api',

    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },

})

type ClientMenuPropsType = {
    section: ClientSectionEnum
    client: ClientType
    isChanged: boolean
    isNew: boolean
    errors: FormikErrors<ClientFields>
    touched: FormikTouched<ClientFields>
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setClientName: (name: string) => void
    updateField: (fieldNumber: number, value: string, type: 'value' | 'bitrixId') => void
    updateClientProducts: (clientId: number) => void
    getProducts: (clientId: number) => void

}

//@ts-ignore
const FileUpload = ({ fileRef, ...props }) => {
    
    //@ts-ignore
    const [updatedFile, setUpdatedFile] = useState(null)

    const [error, setError] = useState(null as string | null);
    //@ts-ignore
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        
        const fileExtension = file && file.name && file.name.split('.').pop();
        
        // if (fileExtension !== 'doc' && fileExtension !== 'docx') {
        //     setError('File must be a .doc file')
        //     alert('File must be a .doc file');
        //     return;
        // } else {
        if (event.currentTarget.files.length) {
            
            props.form.setFieldValue('name', event.currentTarget.files[0]);  // <-- Задаем файл как значение поля

            const formData = new FormData();
            formData.append('file', file);
            formData.append('portal', props.portal);
            formData.append('type', props.type);
            formData.append('fileName', props.fileName);
            console.log(formData)

            const fetchedfileName = await onlineAPI.uploadPortalTemplateFile(formData)
            


            //TESTING UPLOAD REWRITED FILE FROM SERVER:
            // const fileName = fetchedfileName && fetchedfileName.data && fetchedfileName.data.fileName
            // const aprilfields = [{
            //     'bitrixId': 'bitrixId',
            //     'name': 'Гарант'
            // },
            // {
            //     'bitrixId': 'bitrixId2',
            //     'name': 'а'
            // },
            // {
            //     'bitrixId': 'bitrixId3',
            //     'name': 'б'
            // }]
            // await onlineAPI.processFile(fileName, aprilfields)

        }

    };

    return (
        <div>
            {/* {updatedFile && window.open(updatedFile, "_blank")} */}
            <label htmlFor="file">Choose files</label>{" "}

            <input
                id="file"
                ref={fileRef}
                type="file"
                onChange={handleFileChange}

            />
            {error ? <div style={{ color: "red" }}>{error}</div> : null}
        </div>

    );
};

const ClientMenu: React.FC<ClientMenuPropsType> = ({ section, client, isChanged, isNew, touched, errors, handleChange, setClientName, updateField, updateClientProducts, getProducts }) => {

    const fileRef = useRef(null);

    return <div className={style.menu}>
        {/*GENERAL*/}

        {section === ClientSectionEnum.General
            && <ClientGeneral
                client={client}
                isChanged={isChanged}
                isNew={isNew}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                setClientName={setClientName}


            />


        }

        {section === ClientSectionEnum.Fields &&
            <FieldsTable
                fields={client.fields}
                clientId={client.number}
                updateField={updateField}
            />}


        {section === ClientSectionEnum.Products &&
            <>
                {client.products && client.products.length > 0 ? <ProductsTable products={client.products} />
                    : <div className={style.generate}>
                        <div className={style.button__wrapper}>
                            <Button
                                color={'blue'}
                                border={12}
                                onClick={() => { client.number && getProducts(client.number) }}
                                name={'generate client products'} />
                        </div>
                    </div>}
            </>

        }
        {
            section === ClientSectionEnum.Contracts &&
            <>

                <ClientContractContainer />
            </>

        }
        {section === ClientSectionEnum.Prices &&
            <>

                <PriceContainer isClient={true} />
            </>

        }
        {section === ClientSectionEnum.Regions &&
            <>

                <RegionsContainer isClient={true} />
            </>

        }

        {section === ClientSectionEnum.Templates &&
            <>
                <Field
                    name='file'
                    component={FileUpload}
                    fileRef={fileRef}
                    portal={client.domain}
                    type={'kp'}
                    fileName={'test-name'}

                />

            </>

        }
    </div>
}


export default ClientMenu