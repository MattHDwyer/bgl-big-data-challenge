import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Frame } from '../../../../components';
import { useCreateProduct } from '../../utils';
import { ProductInput } from '../../types';

import './AddProductPage.css';

export interface AddProductPageProps {}

export const AddProductPage = ({}: AddProductPageProps) => {
  const methods = useForm<ProductInput>({
    mode: 'onSubmit',
    defaultValues: {
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

  const onSubmit: SubmitHandler<ProductInput> = async (input: ProductInput) => {
    try {
      await useCreateProduct(input);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Frame>
      <Typography component={'h2'}>Add New Product:</Typography>
      <form className="add-product__form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Code'}
          {...register('code')}
          className="add-product__textfield"
        />
        <TextField
          label={'Name'}
          {...register('name')}
          className="add-product__textfield"
        />
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label={'Price'}
          {...register('price')}
          className="add-product__textfield"
        />
        <Button type={'submit'} disabled={!isDirty}>
          Save
        </Button>
      </form>
    </Frame>
  );
};
