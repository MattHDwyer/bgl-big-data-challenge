import uniqid from 'uniqid';
import { Product } from './modules/products/types';
import { ProductInput } from './modules/products/types';

export const idOne = uniqid();
export const idTwo = uniqid();
export const idThree = uniqid();

export let products: Product[] = [
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

const getProducts = () =>
  new Promise<Product[]>((resolve, reject) => {
    if (!products) {
      return reject(new Error('Products not found!'));
    }
    resolve(Object.values(products));
  });

export const useGetProducts = async () => {
  try {
    const result: Awaited<Promise<Product[]>> = await getProducts();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = (data: ProductInput) => {
  new Promise((resolve, reject) => {
    if (!data.code || !data.name || !data.price) {
      reject(new Error('Missing information'));
    }

    const id = uniqid();
    const newProduct = {
      id,
      ...data,
    };

    products = [...products, newProduct];
    resolve(true);
  });
};
