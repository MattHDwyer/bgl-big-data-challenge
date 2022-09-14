import {
  Button,
  Card,
  paperClasses,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Frame } from '../../../../components';
import { Product } from '../../../products/types';
import { useGetProducts } from '../../../products/utils';
import { OrderForm } from '../../components';
import {
  CustomerOrderCalculation,
  CustomerOrderInput,
  CustomerOrderPackages,
  PackagingOptions,
} from '../../types';
import { useGetPackagingOptions } from '../../utils';

export interface OrderPageProps {}

export const OrderPage = ({}: OrderPageProps) => {
  const [packagingOptions, setPackagingOptions] = useState<
    PackagingOptions[] | undefined
  >(undefined);

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const [customerOrderCalc, setCustomerOrderCalc] =
    useState<CustomerOrderCalculation[]>();

  const [numProductsInOrder, setNumProductsInOrder] = useState<number>(1);

  const packingOptionsResult = useGetPackagingOptions();

  const productsResult = useGetProducts();

  useEffect(() => {
    console.log(customerOrderCalc);
  }, [customerOrderCalc]);

  useEffect(() => {
    packingOptionsResult.then((value) => setPackagingOptions(value));
  }, []);

  useEffect(() => {
    productsResult.then((value) => setProducts(value));
  }, []);

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

  const productFormMarkup = [];
  for (let i = 0; i < numProductsInOrder; i++) {
    productFormMarkup.push(<OrderForm key={i} fieldSetName={i.toString()} />);
  }

  const onSubmit = (
    input: CustomerOrderInput[],
  ): CustomerOrderCalculation[] => {
    const result = input.map((orderPart, index) => {
      const packagingOption = packagingOptions.find(
        (packingOption) => packingOption.productCode === orderPart.productCode,
      );
      const product = products.find(
        (product) => product.code === orderPart.productCode,
      );

      if (product) {
        if (packagingOption) {
          let result: CustomerOrderPackages[] = [];
          let shouldSkip = false;
          for (let i = orderPart.amount; i > 0; i--) {
            while (i > 0) {
              packagingOption.packagingOptions.forEach((packOption) => {
                if (shouldSkip) {
                  return;
                } else if (i % packOption.amount !== 0) {
                  const remainder = i % packOption.amount;
                  const packages = Math.floor(i / packOption.amount);
                  if (packages !== 0) {
                    result.push({
                      numberOfPackages: packages,
                      numberOfItems: packOption.amount,
                      price: packages * packOption.price,
                    });
                  }
                  i = remainder;
                } else if (i % packOption.amount === 0) {
                  const packages = i / packOption.amount;
                  i = 0;
                  const loopResult = {
                    numberOfPackages: packages,
                    numberOfItems: packOption.amount,
                    price: packages * packOption.price,
                  };
                  result.push(loopResult);
                }
                if (i === 0) {
                  shouldSkip = true;
                }
              });
            }
          }
          return {
            id: index.toString(),
            productCode: orderPart.productCode,
            packages: result,
          };
        } else {
          let numberOfPackages = 0;
          for (let i = orderPart.amount; i > 0; i--) {
            while (i > 0) {
              numberOfPackages++;
              i--;
            }
          }
          return {
            id: index.toString(),
            productCode: orderPart.productCode,
            packages: [
              {
                numberOfPackages: numberOfPackages,
                numberOfItems: 1,
                price: numberOfPackages * product.price,
              },
            ],
          };
        }
      } else {
        throw new Error('Incorrect ProductCode');
      }
    });

    setCustomerOrderCalc(result);
    return result;
  };

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
      {customerOrderCalc
        ? customerOrderCalc.map((customerOrder, index) => {
            const product = products.find(
              (product) => product.code === customerOrder.productCode,
            );
            let customerOrderPriceTotal = 0;
            customerOrder.packages.forEach((pack) => {
              customerOrderPriceTotal = customerOrderPriceTotal + pack.price;
            });
            let customerOrderAmountTotal = 0;
            customerOrder.packages.forEach((pack) => {
              customerOrderAmountTotal =
                customerOrderAmountTotal + pack.numberOfItems;
            });
            if (!product) {
              return <div>Whoops</div>;
            }
            return (
              <Card>
                {customerOrder.productCode} - {customerOrderPriceTotal}
                {customerOrder.packages.map((pack) => {
                  return (
                    <div>
                      {`${pack.numberOfPackages} package of ${pack.numberOfItems} items (${product.price} each)`}
                    </div>
                  );
                })}
              </Card>
            );
          })
        : null}
    </Frame>
  );
};
