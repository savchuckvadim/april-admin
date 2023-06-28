import * as Yup from 'yup';

export const validate = values => {
  const errors = {};

  if (!values.key) {
    errors.key = 'Не заполнено';
  } else if (values.key.length > 555) {
    errors.key = 'Превышено количество символов';
  }
  // if (values.name.length > 30) {
  //   errors.name = 'Превышено количество символов';
  // }

  return errors;
};


export const schemaClient = Yup.object({
  name: Yup.string()
    .required('Required')
    .max(29, 'Максимум 30 символов'),
  email: Yup.string()
    .max(29, 'Максимум 30 символов')
    .email('Invalid email address') // проверка на корректный email
    .required('Required'), // поле обязательно для заполнения
  domain: Yup.string()
    .max(63, 'Максимум 60 символов')
    .required('Required'),
});