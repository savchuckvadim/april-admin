import React from 'react';
import { Formik } from 'formik';

const Basic = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
       
         <form className={style.card} onSubmit={handleSubmit}>
            <div className={style.card__header}>
                <h2 className={style.card__name}>Client Name</h2>

            </div>
            <div className={style.menu}>
                {props.children}
            </div>
            <div className={style.card__footer}>
                <div className={style.button}>
                <Button color={'blue'} border={3} name={'Cохранить'} onClick={() => alert('Card')}/>
                </div>
               
            </div>

        </form>
      )}
    </Formik>
  </div>
);

export default Basic;