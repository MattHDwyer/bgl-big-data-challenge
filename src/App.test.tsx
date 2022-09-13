import { useGetProducts, idOne, idTwo, idThree } from './utils';

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
