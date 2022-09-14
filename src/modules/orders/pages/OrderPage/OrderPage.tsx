import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Frame } from '../../../../components';
import { Product } from '../../../products/types';
import { useGetProducts } from '../../../products/utils';
import { OrderForm } from '../../components';
import { CustomerOrderInput, PackagingOptions } from '../../types';
import { useGetPackagingOptions } from '../../utils';

export interface OrderPageProps {}

export const OrderPage = ({}: OrderPageProps) => {
  const [packagingOptions, setPackagingOptions] = useState<
    PackagingOptions[] | undefined
  >(undefined);

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const [numProductsInOrder, setNumProductsInOrder] = useState<number>(1);

  const packingOptionsResult = useGetPackagingOptions();

  const productsResult = useGetProducts();

  useEffect(() => {
    packingOptionsResult.then((value) => setPackagingOptions(value));
  }, [packagingOptions]);

  useEffect(() => {
    productsResult.then((value) => setProducts(value));
  }, [products]);

  const methods = useForm<CustomerOrderInput[]>({
    mode: 'onSubmit',
    defaultValues: [
      {
        productCode: '',
        amount: 0,
      },
    ],
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  if (!packagingOptions || !products) {
    return (
      <div>505 Server Error: No Packaging Options or Products provided</div>
    );
  }

  const onSubmit: SubmitHandler<CustomerOrderInput[]> = (
    input: CustomerOrderInput[],
  ) => {
    console.log(input);
  };

  const productFormMarkup = [];
  for (let i = 0; i < numProductsInOrder; i++) {
    productFormMarkup.push(<OrderForm key={i} fieldSetName={i.toString()} />);
  }

  return (
    <Frame>
      <Typography>OrderPage</Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {productFormMarkup}
          <Button
            onClick={(e) => {
              e.preventDefault();
              setNumProductsInOrder(numProductsInOrder + 1);
            }}
          >
            Add Another Product
          </Button>
          <Button disabled={!isDirty} type={'submit'}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </Frame>
  );
};
