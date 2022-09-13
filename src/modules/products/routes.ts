import { RouteType } from '../../types';
import { ProductPage, AddProductPage, EditProductPage } from './pages';

export const routes: RouteType[] = [
  {
    path: '/products/*',
    component: ProductPage,
    childRoutes: [
      {
        path: '/:productId',
        component: EditProductPage,
      },
      {
        path: '/add',
        component: AddProductPage,
      },
    ],
  },
];
