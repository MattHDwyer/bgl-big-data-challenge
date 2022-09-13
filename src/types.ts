import React from 'react';

export type RouteType = {
  path: string;
  component: React.ComponentType<any>;
  childRoutes?: RouteType[];
};
