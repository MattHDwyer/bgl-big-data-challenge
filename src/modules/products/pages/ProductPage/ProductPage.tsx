import React, { useEffect } from 'react';
import { useGetProducts } from '../../../../utils';

import './ProductPage.css';

export interface ProductPageProps {}

export const ProductPage = ({}: ProductPageProps) => {
  const result = useGetProducts();

  useEffect(() => {
    console.log(result);
  }, [result]);

  return <div>ProductPage</div>;
};
