import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProduct } from '../../../../utils';
import { Product } from '../../types';

import './EditProductPage.css';

export interface EditProductPageProps {}

export const EditProductPage = ({}: EditProductPageProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  let { productId } = useParams();

  const result = productId && useGetSingleProduct(productId);

  useEffect(() => {
    result && result.then((product) => setProduct(product));
  }, [product]);

  return <div>EditProductPage</div>;
};
