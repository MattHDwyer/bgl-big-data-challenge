import { RouteType } from './types';

import { routes as productRoutes } from './modules/products/routes';
import { routes as orderRoutes } from './modules/orders/routes';

const routes: RouteType[] = [...productRoutes, ...orderRoutes];

export { routes };
