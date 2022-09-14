import { PackagingOptions } from '../../types';

it('should return an array of the default packaging options for Cheese and Ham', async () => {
  const result = await useGetPackagingOptions();
  const expected: PackagingOptions[] = [
    {
      id: '1',
      productCode: 'CE',
      packagingOptions: [
        {
          amount: 3,
          price: 14.495,
        },
        {
          amount: 5,
          price: 20.95,
        },
      ],
    },
    {
      id: '2',
      productCode: 'HM',
      packagingOptions: [
        {
          amount: 2,
          price: 13.95,
        },
        {
          amount: 5,
          price: 29.95,
        },
        {
          amount: 8,
          price: 40.95,
        },
      ],
    },
  ];

  expect(result).toEqual(expect.arrayContaining(expected));
});
