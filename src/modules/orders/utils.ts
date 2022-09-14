import { PackagingOptions } from './types';

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

const getPackagingOptions = () =>
  new Promise<PackagingOptions[]>((resolve, reject) => {
    if (!packagingOptions) {
      return reject(new Error('Packaging Options not found!'));
    }
    resolve(Object.values(packagingOptions));
  });

export const useGetPackagingOptions = async () => {
  try {
    const result: Awaited<Promise<PackagingOptions[]>> =
      await getPackagingOptions();
    return result;
  } catch (error) {
    console.error(error);
  }
};
