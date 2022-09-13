import uniqid from 'uniqid';
import { Product } from './modules/products/types';
import { ProductInput } from './modules/products/types';

export const idOne: string = '1';
export const idTwo: string = '2';
export const idThree: string = '3';

let products: Product[] = [
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

const createProduct = (data: ProductInput) =>
  new Promise<boolean>((resolve, reject) => {
    if (!data.code || !data.name || !data.price) {
      reject(new Error('Missing information'));
    }

    const id = (products.length + 1).toString();

    const newProduct: Product = {
      id,
      ...data,
    };

    products = [...products, newProduct];

    resolve(true);
  });

export const useCreateProduct = async (data: ProductInput) => {
  try {
    const result = await createProduct(data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getProduct = (id: string) =>
  new Promise<Product>((resolve, reject) => {
    const product: Product | undefined = products.find(
      (product) => product.id === id,
    );

    if (!product) {
      return reject(new Error('Product not found!'));
    }
    resolve(product);
  });

export const useGetSingleProduct = async (id: string) => {
  try {
    const result = await getProduct(id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * UPDATE MOCK API CALL:
 * - Accepts an ID which is a string
 * - Returns true if successful, else returns an Error
 * **/

const updateProduct = (id: string, data: ProductInput) =>
  new Promise<boolean>((resolve, reject) => {
    const foundIndex = products.findIndex((product) => product.id === id);

    if (!products[foundIndex]) {
      return reject(new Error('Product not found!'));
    }

    products[foundIndex] = { ...products[foundIndex], ...data };

    resolve(true);
  });

export const useUpdateProduct = async (id: string, data: ProductInput) => {
  try {
    const result = await updateProduct(id, data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * DELETE MOCK API CALL:
 * - Accepts an ID which is a string
 * - Returns true if successful, else returns an Error
 * **/
const deleteProduct = (id: string) =>
  new Promise((resolve, reject) => {
    const foundIndex = products.findIndex((product) => product.id === id);
    const { [foundIndex]: product, ...rest } = products;

    if (!product) {
      return reject(new Error('Product not found'));
    }

    products = rest;

    resolve(true);
  });

export const useDeleteProduct = async (id: string) => {
  try {
    const result = await deleteProduct(id);
    return result;
  } catch (error) {
    console.error(error);
  }
};
