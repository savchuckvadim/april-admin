import { ErrorMessage, Field, Form, Formik, useField } from "formik"
import Filter from "../../Elements/Filter/Filter"
import FilterButtons from "../../Elements/Filter/Filter-Buttons/Filter-Buttons"
import style from './Fields.module.scss'
import FieldsTable from "./FieldsTable/FieldsTable"
import { useEffect, useState } from "react"
import { FieldType } from "../../../types/types"
import UploadData from "../../Elements/Actions/Upload/UploadData"
import { schemaClient } from "../../../utils/Validators/validator-april"
import { Button } from "@mui/material"

type InitialValuesType = {
  [key: string]: FieldType;
};



//@ts-ignore

const Fields = ({ fields, filters, filterCurrent, getFields, setFilter, updateField, upload }) => {

  const [stateFields, setStateFields] = useState([...fields])
  const [tableValues, setTableValues] = useState(null as InitialValuesType | null)
  const [initialFields, setInitialValues] = useState(
    { fields: fields as InitialValuesType }

  )
  useEffect(() => {
    let initialResult = {} as InitialValuesType


    fields.forEach((fld: FieldType) => {

      initialResult[`${fld.name}`] = fld

    });

    setInitialValues({ fields: initialResult })
    if (fields.length < 1) {

      getFields()
    }
    setStateFields(fields)
    // setTableValues(initialResult)

  }, [fields])


  return (
    // initialFields.fields.contract || initialFields.fields.dealName ? 
    <div className={style.filter__wrapper}>
      <Filter name={'clients'}>
        <FilterButtons actions={filters} filter={(index: number) => setFilter(index)} initialIndex={filterCurrent} />
      </Filter>
      <UploadData upload={upload} />
      {/* <FieldsUpdateContainer /> */}
      {//@ts-ignore
        <Formik

          initialValues={{
            ...initialFields
          }}
          validationSchema={schemaClient}
          onSubmit={(values, { setSubmitting }) => {

            const fields = []

            console.log(values)

            setSubmitting(true);

          }}
        >{({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setValues,
          initialValues
          /* and other goodies */
        }) => {
          let touchedFlag = false
          for (const key in touched) {

            //@ts-ignore
            if (touched[key]) {
              touchedFlag = true
            }
          }

          if (!touchedFlag) {
            if (initialValues.fields.contract && !values.fields.contract) {
              setValues(initialValues)
            } else {

              if (values.fields.contract && initialValues.fields.contract.bitrixId !== values.fields.contract.bitrixId) {
                setValues(initialValues)
              }
            }




          }
          // console.log('values')
          // console.log(values)

          return <Form>
            <FieldsTable

              fields={stateFields}
              updateField={updateField}
              clientId={null} />
            <Button type="submit"> Отправить</Button>
          </Form>


        }}

        </Formik>

      }
    </div >
    // : <p>Loading...</p>
    )
}



export default Fields