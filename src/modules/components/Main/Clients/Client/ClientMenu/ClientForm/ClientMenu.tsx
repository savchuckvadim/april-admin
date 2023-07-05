import { FormikErrors, FormikTouched } from "formik"
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


const ClientMenu: React.FC<ClientMenuPropsType> = ({ section, client, isChanged, isNew, touched, errors, handleChange, setClientName, updateField, updateClientProducts, getProducts }) => {
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
    </div>
}


export default ClientMenu