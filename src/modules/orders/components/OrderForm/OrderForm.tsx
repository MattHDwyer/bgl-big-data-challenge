import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import './OrderForm.css';

export interface OrderFormProps {
  fieldSetName: string;
}

export const OrderForm = ({ fieldSetName }: OrderFormProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <TextField
        label={'Product Code'}
        {...register(`${fieldSetName}.productCode`)}
      />
      <TextField label={'Amount'} {...register(`${fieldSetName}.amount`)} />
    </div>
  );
};
