import { RouteType } from './types';

import { routes as productRoutes } from './modules/products/routes';

const routes: RouteType[] = [...productRoutes];

export { routes };
