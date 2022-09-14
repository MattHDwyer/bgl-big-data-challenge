import { Link, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Product } from '../../modules/products/types';
import { useGetProducts } from '../../modules/products/utils';
import { Frame } from '../Frame';

import './App.css';

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const result = useGetProducts();

  useEffect(() => {
    result.then((value) => setProducts(value));
  }, []);

  const productLinkMarkup = products
    ? `/products/${products[0].id}`
    : `/products`;

  return (
    <Frame>
      <div className="dashboard__container">
        <Typography component={'h1'}>BGL Grocery Store</Typography>
        <div className="content__container">
          <Link
            href={`${productLinkMarkup}`}
            underline={'hover'}
            className="content__link"
          >
            <Card className="link__card">View/Create Products</Card>
          </Link>
          <Link href="/orders" underline={'hover'} className="content__link">
            <Card className="link__card">Create Orders</Card>
          </Link>
        </div>
      </div>
    </Frame>
  );
};
