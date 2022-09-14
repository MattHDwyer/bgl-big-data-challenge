import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import './ProductOrderField.css';

export interface ProductOrderFieldProps {
  fieldSetName: string;
}

export const ProductOrderField = ({ fieldSetName }: ProductOrderFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="order-form__container">
      <TextField
        label={'Product Code'}
        {...register(`${fieldSetName}.productCode`)}
        className="order-form__textfield"
      />
      <TextField
        label={'Amount'}
        {...register(`${fieldSetName}.amount`)}
        className="order-form__textfield"
      />
    </div>
  );
};
