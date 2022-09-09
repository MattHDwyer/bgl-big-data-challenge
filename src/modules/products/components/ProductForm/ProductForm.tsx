import React from 'react';
import { Product } from '../../types';
import { useForm } from 'react-hook-form';

import './ProductForm.css';

export interface ProductFormProps {
  product?: Product;
}

export const ProductForm = ({ product }: ProductFormProps) => {
  const { register } = useForm<Product>({
    defaultValues: {
      code: product ? product.code : '',
      name: product ? product.name : '',
      price: product ? product.price : 0,
    },
  });

  return (
    <div className="product-form-wrapper">
      <div>
        <label htmlFor="productCode">
          Code:
          <input id="productCode" {...register('code')} />
        </label>
      </div>
      <div>
        <label htmlFor="productName">
          Name:
          <input id="productName" {...register('name')} />
        </label>
      </div>
      <div>
        <label htmlFor="productPrice">
          Price:
          <input id="productPrice" {...register('price')} />
        </label>
      </div>
    </div>
  );
};
