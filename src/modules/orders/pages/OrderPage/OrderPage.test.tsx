import {
  CustomerOrderCalculation,
  CustomerOrderInput,
  CustomerOrderPackages,
  PackagingOptions,
} from '../../types';
import { useGetPackagingOptions } from '../../utils';
import { onSubmit } from './utils';

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

it('should return 2 packages of 5 items for Cheese', () => {
  const mockOrder1: CustomerOrderInput[] = [
    {
      productCode: 'CE',
      amount: 10,
    },
  ];

  const result1 = onSubmit(mockOrder1);

  console.log(result1);

  const expected1: CustomerOrderCalculation[] = [
    {
      id: '1',
      productCode: 'CE',
      packages: [
        {
          amount: 2,
          numberOfItems: 5,
          price: 40.95,
        },
      ],
    },
  ];

  expect(result1).toEqual(expect.arrayContaining(expected1));
});

it('should return 2 packages of 5 items of Cheese and for Ham: 1 package of 8, 1 package of 5, and 1 package of 1', () => {
  const mockOrder2: CustomerOrderInput[] = [
    {
      productCode: 'CE',
      amount: 10,
    },
    {
      productCode: 'HM',
      amount: 14,
    },
  ];
  const result2 = onSubmit(mockOrder2);

  const expected2: CustomerOrderCalculation[] = [
    {
      id: '1',
      productCode: 'CE',
      packages: [
        {
          amount: 2,
          numberOfItems: 5,
          price: 40.95,
        },
      ],
    },
    {
      id: '2',
      productCode: 'HM',
      packages: [
        {
          amount: 1,
          numberOfItems: 8,
          price: 40.95,
        },
        {
          amount: 1,
          numberOfItems: 5,
          price: 29.95,
        },
        {
          amount: 1,
          numberOfItems: 1,
          price: 7.95,
        },
      ],
    },
  ];

  expect(result2).toEqual(expect.arrayContaining(expected2));
});
