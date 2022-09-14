import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteType } from '../../../../types';
import { useGetProducts } from '../../utils';
import { ProductList } from '../../components';

import './ProductPage.css';

export interface ProductPageProps {
  childRoutes?: RouteType[];
}

export const ProductPage = ({ childRoutes = [] }: ProductPageProps) => {
  const result = useGetProducts();

  useEffect(() => {
    console.log(result.then((value) => console.log(value)));
  }, [result]);

  return (
    <div className="product-page__container">
      <ProductList />
      <Routes>
        {childRoutes.map((route, i) => {
          return (
            <Route
              key={i}
              path={route.path}
              element={<route.component childRoutes={route.childRoutes} />}
            />
          );
        })}
      </Routes>
    </div>
  );
};
