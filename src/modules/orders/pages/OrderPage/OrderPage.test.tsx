import { Product } from '../../../products/types';
import {
  CustomerOrderCalculation,
  CustomerOrderInput,
  CustomerOrderPackages,
  PackagingOptions,
} from '../../types';
import { useGetPackagingOptions } from '../../utils';

const packagingOptions: PackagingOptions[] = [
  {
    id: '1',
    productCode: 'CE',
    packagingOptions: [
      {
        amount: 5,
        price: 20.95,
      },
      {
        amount: 3,
        price: 14.495,
      },
      {
        amount: 1,
        price: 5.95,
      },
    ],
  },
  {
    id: '2',
    productCode: 'HM',
    packagingOptions: [
      {
        amount: 8,
        price: 40.95,
      },
      {
        amount: 5,
        price: 29.95,
      },
      {
        amount: 2,
        price: 13.95,
      },
      {
        amount: 1,
        price: 7.95,
      },
    ],
  },
];

const products: Product[] = [
  {
    id: '1',
    code: 'CE',
    name: 'Cheese',
    price: 5.95,
  },
  {
    id: '2',
    code: 'HM',
    name: 'Ham',
    price: 7.95,
  },
  {
    id: '3',
    code: 'SS',
    name: 'Soy Sauce',
    price: 11.95,
  },
];

const onSubmit = (input: CustomerOrderInput[]): CustomerOrderCalculation[] => {
  const result = input.map((orderPart, index) => {
    const packagingOption = packagingOptions.find(
      (packingOption: PackagingOptions) =>
        packingOption.productCode === orderPart.productCode,
    );

    const product = products.find(
      (product: Product) => product.code === orderPart.productCode,
    );

    if (product) {
      if (packagingOption) {
        let result: CustomerOrderPackages[] = [];
        let shouldSkip = false;
        for (let i = orderPart.amount; i > 0; i--) {
          while (i > 0) {
            packagingOption.packagingOptions.forEach((packOption: any) => {
              if (shouldSkip) {
                return;
              } else if (i % packOption.amount !== 0) {
                const remainder = i % packOption.amount;
                const packages = Math.floor(i / packOption.amount);
                if (packages !== 0) {
                  result.push({
                    numberOfPackages: packages,
                    numberOfItems: packOption.amount,
                    price: packages * packOption.price,
                  });
                }
                i = remainder;
              } else if (i % packOption.amount === 0) {
                const packages = i / packOption.amount;
                i = 0;
                const loopResult = {
                  numberOfPackages: packages,
                  numberOfItems: packOption.amount,
                  price: packages * packOption.price,
                };
                result.push(loopResult);
              }
              if (i === 0) {
                shouldSkip = true;
              }
            });
          }
        }
        return {
          id: index.toString(),
          productCode: orderPart.productCode,
          packages: result,
        };
      } else {
        let numberOfPackages = 0;
        for (let i = orderPart.amount; i > 0; i--) {
          while (i > 0) {
            numberOfPackages++;
            i--;
          }
        }
        return {
          id: index.toString(),
          productCode: orderPart.productCode,
          packages: [
            {
              numberOfPackages: numberOfPackages,
              numberOfItems: 1,
              price: numberOfPackages * product.price,
            },
          ],
        };
      }
    } else {
      throw new Error('Incorrect ProductCode');
    }
  });

  return result;
};

it('should return an array of the default packaging options for Cheese and Ham', async () => {
  const result = await useGetPackagingOptions();
  const expected: PackagingOptions[] = [
    {
      id: '1',
      productCode: 'CE',
      packagingOptions: [
        {
          amount: 5,
          price: 20.95,
        },
        {
          amount: 3,
          price: 14.495,
        },
        {
          amount: 1,
          price: 5.95,
        },
      ],
    },
    {
      id: '2',
      productCode: 'HM',
      packagingOptions: [
        {
          amount: 8,
          price: 40.95,
        },
        {
          amount: 5,
          price: 29.95,
        },
        {
          amount: 2,
          price: 13.95,
        },
        {
          amount: 1,
          price: 7.95,
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
      id: '0',
      productCode: 'CE',
      packages: [
        {
          numberOfPackages: 2,
          numberOfItems: 5,
          price: 41.9,
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
      id: '0',
      productCode: 'CE',
      packages: [
        {
          numberOfPackages: 2,
          numberOfItems: 5,
          price: 41.9,
        },
      ],
    },
    {
      id: '1',
      productCode: 'HM',
      packages: [
        {
          numberOfPackages: 1,
          numberOfItems: 8,
          price: 40.95,
        },
        {
          numberOfPackages: 1,
          numberOfItems: 5,
          price: 29.95,
        },
        {
          numberOfPackages: 1,
          numberOfItems: 1,
          price: 7.95,
        },
      ],
    },
  ];

  expect(result2).toEqual(expect.arrayContaining(expected2));
});
