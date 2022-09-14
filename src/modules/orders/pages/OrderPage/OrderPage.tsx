import { Button, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Frame } from '../../../../components';
import { Product } from '../../../products/types';
import { useGetProducts } from '../../../products/utils';
import { ProductOrderField } from '../../components';
import {
  CustomerOrderCalculation,
  CustomerOrderInput,
  CustomerOrderPackages,
  PackagingOptions,
} from '../../types';
import { useGetPackagingOptions } from '../../utils';

import './OrderPage.css';

export interface OrderPageProps {}

export const OrderPage = ({}: OrderPageProps) => {
  const [packagingOptions, setPackagingOptions] = useState<
    PackagingOptions[] | undefined
  >(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  // Setting up State for Customer Orders. This will be used to show an output for what the order will be (e.g. total number of packages, cost, etc)
  const [customerOrderCalc, setCustomerOrderCalc] =
    useState<CustomerOrderCalculation[]>();
  const [numProductsInOrder, setNumProductsInOrder] = useState<number>(1);

  // Assigning Product Packing Options and Products to state variables
  const packingOptionsResult = useGetPackagingOptions();
  const productsResult = useGetProducts();
  useEffect(() => {
    packingOptionsResult.then((value) => setPackagingOptions(value));
  }, []);
  useEffect(() => {
    productsResult.then((value) => setProducts(value));
  }, []);

  // Set up of Form methods
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
    reset,
    formState: { isDirty },
  } = methods;

  // Return error if packaging options or products aren't provided
  if (!packagingOptions || !products) {
    return (
      <div>505 Server Error: No Packaging Options or Products provided</div>
    );
  }

  // Render a Product Field for the Order Form
  let productFormMarkup = [];
  for (let i = 0; i < numProductsInOrder; i++) {
    productFormMarkup.push(
      <ProductOrderField key={i} fieldSetName={i.toString()} />,
    );
  }

  // Form Submitting Function. This set the CustomerOrderCalculation State.
  const onSubmit = (
    input: CustomerOrderInput[],
  ): CustomerOrderCalculation[] => {
    // 1. Loop through each of the ProductOrderFields
    const result = input.map((orderPart, index) => {
      // 2. Assign the PackingOption and Product the Order belongs too
      const packagingOption: PackagingOptions | undefined =
        packagingOptions.find(
          (packingOption) =>
            packingOption.productCode === orderPart.productCode,
        );
      const product: Product | undefined = products.find(
        (product) => product.code === orderPart.productCode,
      );

      // 3. If there is a product, calculate the order. Else return error.
      if (product) {
        // 4. If there is a packing option, calculate the order.
        //    Else calculate the number of packages based off the product price.
        if (packagingOption) {
          // 5. Store the result in the array below.
          let result: CustomerOrderPackages[] = [];

          // Set variable so that if the order has been calculated, it skips through the forEach loop below
          let shouldSkip = false;

          // While i (which is the Order Amount) is greater than 0, loop through the packing options.
          for (let i = orderPart.amount; i > 0; i--) {
            while (i > 0) {
              packagingOption.packagingOptions.forEach((packOption) => {
                // if skipping, return nothing.
                if (shouldSkip) {
                  return;
                } else if (i % packOption.amount !== 0) {
                  // 6. If i % packOption, identify: remainder, number of packages that can created based off the order.
                  const remainder = i % packOption.amount;

                  // 7. Assign the number of packages based on the packOption amount.
                  const packages = Math.floor(i / packOption.amount);

                  // 8. Assign packages, identify the number of items in each of those packages
                  //    and calculate the price of all the packages
                  if (packages !== 0) {
                    result.push({
                      numberOfPackages: packages,
                      numberOfItems: packOption.amount,
                      price: packages * packOption.price,
                    });
                  }

                  // Set i to be the remainder of the modulo.
                  i = remainder;
                } else if (i % packOption.amount === 0) {
                  // 9. calculate number of packages
                  const packages = i / packOption.amount;

                  i = 0;
                  // Assign the result to the results arr we defined earlier.
                  const loopResult = {
                    numberOfPackages: packages,
                    numberOfItems: packOption.amount,
                    price: packages * packOption.price,
                  };
                  result.push(loopResult);
                }
                // set shouldSkip to true, to skip the rest of the logic during the forEach
                if (i === 0) {
                  shouldSkip = true;
                }
              });
            }
          }
          // return a CustomerOrder object.
          return {
            id: index.toString(),
            productCode: orderPart.productCode,
            packages: result,
          };
        } else {
          // If there are no PackagingOptions for a product,
          // loop through the amount of the order and the product price to calculate the number of packages required.
          let numberOfPackages = 0;
          for (let i = orderPart.amount; i > 0; i--) {
            while (i > 0) {
              numberOfPackages++;
              i--;
            }
          }
          // Add the following object to the result array.
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

    // set the data for the customer order calculation to render
    setCustomerOrderCalc(result);

    // return the result
    return result;
  };

  return (
    <Frame>
      <div className="order-page__container">
        <Typography component={'h2'}>Create Order</Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="order__form">
            {productFormMarkup}
            <div className="order__button-wrapper">
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
            </div>
          </form>
        </FormProvider>

        {customerOrderCalc ? (
          <div>
            <Typography component={'h3'}>Order Summary</Typography>
            <div>
              {customerOrderCalc.map((customerOrder, index) => {
                // Assign the product
                const product = products.find(
                  (product) => product.code === customerOrder.productCode,
                );

                // Calculate the total cost of the order
                let customerOrderPriceTotal = 0;
                customerOrder.packages.forEach((pack) => {
                  customerOrderPriceTotal =
                    customerOrderPriceTotal + pack.price;
                });

                // calculate the total number of products ordered
                let customerOrderAmountTotal = 0;
                customerOrder.packages.forEach((pack) => {
                  customerOrderAmountTotal =
                    customerOrderAmountTotal + pack.numberOfItems;
                });

                // if there's no product, render an error
                if (!product) {
                  return <div>Whoops</div>;
                }

                return (
                  <Card className="order-summary__card">
                    <Typography component={'h4'}>
                      {customerOrder.productCode} -{' '}
                      {parseFloat(customerOrderPriceTotal.toString()).toFixed(
                        2,
                      )}
                    </Typography>
                    {customerOrder.packages.map((pack) => {
                      return (
                        <div>
                          {`${pack.numberOfPackages} packages of ${pack.numberOfItems} items (${product.price} each)`}
                        </div>
                      );
                    })}
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
        {isDirty ? (
          <Button
            // Reset the form on this button click
            onClick={(e) => {
              e.preventDefault();
              setCustomerOrderCalc(undefined);
              reset();
              productFormMarkup = [];
            }}
          >
            Clear
          </Button>
        ) : null}
      </div>
    </Frame>
  );
};
