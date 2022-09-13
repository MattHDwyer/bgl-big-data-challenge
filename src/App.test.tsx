import {
  useGetProducts,
  idOne,
  idTwo,
  idThree,
  useDeleteProduct,
  useUpdateProduct,
  useGetSingleProduct,
} from './utils';

it('should return an array of default products (Cheese, Ham, Soy Sauce)', async () => {
  const result = await useGetProducts();
  const expected = [
    {
      id: idOne,
      code: 'CE',
      name: 'Cheese',
      price: 5.95,
    },
    {
      id: idTwo,
      code: 'HM',
      name: 'Ham',
      price: 7.95,
    },
    {
      id: idThree,
      code: 'SS',
      name: 'Soy Sauce',
      price: 11.95,
    },
  ];

  expect(result).toEqual(expect.arrayContaining(expected));
});

it('should return just the cheese object', async () => {
  const result = await useGetSingleProduct(idOne);
  const expected = {
    id: idOne,
    code: 'CE',
    name: 'Cheese',
    price: 5.95,
  };
  expect(result).toEqual(expect.objectContaining(expected));
});

it('should return an array of all the default products, except for Cheese. Cheese price should update to 10.15 (inflation)', async () => {
  await useUpdateProduct(idOne, {
    code: 'CE',
    name: 'Cheese',
    price: 10.15,
  });

  const expected = [
    {
      id: idOne,
      code: 'CE',
      name: 'Cheese',
      price: 10.15,
    },
    {
      id: idTwo,
      code: 'HM',
      name: 'Ham',
      price: 7.95,
    },
    {
      id: idThree,
      code: 'SS',
      name: 'Soy Sauce',
      price: 11.95,
    },
  ];
  const updatedProductData = await useGetProducts();

  expect(updatedProductData).toEqual(expect.arrayContaining(expected));
});

it('should return an array of all the default products, except for Cheese. Which should be removed', async () => {
  await useDeleteProduct(idOne);

  const expected = [
    {
      id: idTwo,
      code: 'HM',
      name: 'Ham',
      price: 7.95,
    },
    {
      id: idThree,
      code: 'SS',
      name: 'Soy Sauce',
      price: 11.95,
    },
  ];

  const updatedProductData = await useGetProducts();

  expect(updatedProductData).toEqual(expect.arrayContaining(expected));
});
