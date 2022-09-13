import { Card, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGetProducts } from '../../../../utils';
import { Product } from '../../types';

import './ProductList.css';

export interface ProductListProps {}

export const ProductList = ({}: ProductListProps) => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const result = useGetProducts();

  useEffect(() => {
    result.then((value) => setProducts(value));
  }, [result]);

  return (
    <div className="product-list__container">
      <Link href="/products/add">
        <Card className="product__card product__card--centered">
          Add New Product
        </Card>
      </Link>
      {products
        ? products.map((product) => {
            return (
              <Link href={`/products/${product.id}`}>
                <Card className="product__card">
                  {product.name} ({product.code})
                </Card>
              </Link>
            );
          })
        : null}
    </div>
  );
};
