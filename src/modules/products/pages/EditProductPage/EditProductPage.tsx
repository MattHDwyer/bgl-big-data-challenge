import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Frame } from '../../../../components';
import { useGetSingleProduct, useUpdateProduct } from '../../utils';
import { Product, ProductInput } from '../../types';

import './EditProductPage.css';

export interface EditProductPageProps {}

export const EditProductPage = ({}: EditProductPageProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  let { productId } = useParams();

  const result = productId && useGetSingleProduct(productId);

  const methods = useForm<ProductInput>({
    mode: 'onSubmit',
    defaultValues: product
      ? {
          code: product.code,
          name: product.name,
          price: product.price,
        }
      : {
          code: '',
          name: '',
          price: 0,
        },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    result && result.then((product) => setProduct(product));
    reset(product);
  }, [product]);

  const onSubmit: SubmitHandler<ProductInput> = async (input: ProductInput) => {
    if (!product) {
      throw new Error('Uh oh! No Product was provided...');
    }

    try {
      await useUpdateProduct(product.id, input);
    } catch (error) {
      console.error(error);
    }
  };

  return product ? (
    <Frame>
      <Typography component={'h2'}>Edit {product.name}:</Typography>
      <form className="edit-product__form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Code'}
          {...register('code')}
          defaultValue={product.code}
          className="edit-product__textfield"
        />
        <TextField
          label={'Name'}
          {...register('name')}
          defaultValue={product.name}
          className="edit-product__textfield"
        />
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label={'Price'}
          {...register('price')}
          defaultValue={product.price}
          className="edit-product__textfield"
        />
        <Button type={'submit'} disabled={!isDirty}>
          Save
        </Button>
      </form>
    </Frame>
  ) : (
    <div>ERROR 404: Product not found!</div>
  );
};
