import { Link, Card, Typography } from '@mui/material';
import React from 'react';
import { Frame } from '../Frame';

import './App.css';

export interface AppProps {}

export const App = ({}: AppProps) => {
  return (
    <Frame>
      <div className="dashboard__container">
        <Typography component={'h1'}>BGL BigData App</Typography>
        <div className="content__container">
          <Link href="/products" underline={'hover'} className="content__link">
            <Card className="link__card">View all Products</Card>
          </Link>
          <Link href="/orders" underline={'hover'} className="content__link">
            <Card className="link__card">View all Orders</Card>
          </Link>
        </div>
      </div>
    </Frame>
  );
};
