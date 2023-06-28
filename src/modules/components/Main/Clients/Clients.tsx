import Filter from "../../Elements/Filter/Filter"
import ClientsTable from "./ClientsTable/ClientsTable"
import style from './Clients.module.scss';
import FilterButtons from "../../Elements/Filter/Filter-Buttons/Filter-Buttons";
import { Field, Form, Formik } from "formik";
import { validate } from "../../../utils/Validators/validator-april";
import { FieldsUpdateInput } from "../Fields/FieldsUpdate/FieldsUpdate";
import { ClientType } from "../../../types/types";
import React from "react";


type ClientsPropsType = {
  clients: Array<ClientType>
}

const Clients: React.FC<ClientsPropsType> = ({ clients }) => {

  return (
    <div className={style.clients}>
      <Formik
        initialValues={{ clientSearch: '' }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {


          setSubmitting(true)
        }}
      >
        {formik => {

          // @ts-ignore
          const doubleClick = (e) => {
            formik.handleBlur(e);
            formik.setErrors({});

            console.log(formik.errors)
          };

          return (
            <>
              <Form>
                <Filter isLong={true} name={'clients'} callback={() => { alert('clientsfilter') }}>
                  <div className={!formik.errors.clientSearch ? style.secret__wrapper : style.secret__wrapperError}>
                    <Field
                      name="fieldsUpdate"
                      component={FieldsUpdateInput}
                      label="fieldsUpdate"
                      placeholder={formik.errors.clientSearch || 'secret key'}
                      onDoubleClick={doubleClick}

                    />

                    {/* <input  {...formik} {...props}  name="fieldsUpdate" type='text' placeholder="secret key" className={style.secret__input}></input> */}
                  </div>
                  <FilterButtons color={true} link={{ name: '+Добавить', to: 'add' }} actions={['Поиск', '+Добавить']} filter={() => alert(`Загрузить`)} />
                </Filter>
                <ClientsTable clients={clients}/>
              </Form>

            </>
          )
        }}
      </Formik>
    </div>
  )
}

export default Clients