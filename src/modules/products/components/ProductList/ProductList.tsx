import { Card, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { MoneyText } from '../../../../components/MoneyText';
import { useGetProducts } from '../../utils';
import { Product } from '../../types';

import './ProductList.css';

export interface ProductListProps {}

export const ProductList = ({}: ProductListProps) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const result = useGetProducts();

  useEffect(() => {
    result.then((value) => setProducts(value));
  }, []);

  return (
    <div className="product-list__container">
      <Link href="/products/add" underline={'hover'}>
        <Card className="product__card product__card__add-product">
          Add New Product
        </Card>
      </Link>
      {products
        ? products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                underline={'hover'}
              >
                <Card className="product__card">
                  <span>
                    {product.name} ({product.code})
                  </span>
                  <span>
                    <MoneyText value={product.price} />
                  </span>
                </Card>
              </Link>
            );
          })
        : null}
    </div>
  );
};
