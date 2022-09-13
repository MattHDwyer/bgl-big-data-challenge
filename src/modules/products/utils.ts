import * as Yup from 'yup';

export const productSchema = Yup.object({
  code: Yup.string().required('Product Code is required'),
  name: Yup.string().required('Product name is required'),
  price: Yup.number().positive().integer(),
});
