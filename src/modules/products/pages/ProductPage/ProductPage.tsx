import React, { useState } from 'react';
import { Product } from '../../types';
import { useForm } from 'react-hook-form';

import './ProductPage.css';
import { ProductForm } from '../../components/ProductForm';

export interface ProductPageProps {}

export const ProductPage = ({}: ProductPageProps) => {
  const [products, setProducts] = useState<Product[]>([
    {
      code: 'CE',
      name: 'Cheese',
      price: 5.95,
    },
    {
      code: 'HM',
      name: 'Ham',
      price: 7.95,
    },
    {
      code: 'SS',
      name: 'Soy Sauce',
      price: 11.95,
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Product>({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
      name: '',
      price: 0,
    },
  });

  const onSubmit = (data: Product) => {
    setProducts([...products, data]);
    reset();
  };

  return (
    <div>
      <h1>Product Page</h1>
      <div>
        {products.map((product, index) => {
          return <ProductForm product={product} />;
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductForm />
          <input type="submit" disabled={isDirty} />
        </form>
      </div>
    </div>
  );
};
