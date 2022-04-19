/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthState } from 'context/AuthContext';
import AppLoading from 'components/AppLoading/AppLoading';

// Lazy Components
const Carts = lazy(() => import('pages/Carts'));
const Login = lazy(() => import('pages/SignIn'));
const Products = lazy(() => import('pages/Products'));
const BasicLayout = lazy(() => import('layouts/BasicLayout'));
const CreateProduct = lazy(() => import('pages/CreateProduct'));

const DefaultRouteComponent: React.FC = () => (
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  <Navigate to={Routes.home.routes.products.path || '/'} />
);

export interface IRoutes {
  // Required
  id: string;
  Element: React.ComponentType<any>;

  // Optional
  path?: string;
  index?: boolean;
  isAuth?: boolean;
  isAdmin?: boolean;
  routes?: Record<string, IRoutes>;
}

export const Routes = {
  signIn: {
    id: 'signIn',
    Element: Login,

    // Optional
    path: '/signIn',
  },
  home: {
    id: 'home',
    Element: BasicLayout,

    // Optional
    path: '/*',
    routes: {
      indexHome: {
        id: 'indexHome',
        Element: Products,

        // Optional
        index: true,
      },
      createProduct: {
        id: 'createProduct',
        Element: CreateProduct,

        // Optional
        isAuth: true,
        isAdmin: true,
        path: 'createProduct',
      },
      products: {
        id: 'products',
        Element: Products,

        // Optional
        path: 'products',
      },
      carts: {
        id: 'carts',
        Element: Carts,

        // Optional
        isAuth: true,
        path: 'carts',
      },
      default: {
        id: 'default',
        Element: DefaultRouteComponent,

        // Optional
        path: '*',
      },
    },
  },
  default: {
    id: 'default',
    Element: DefaultRouteComponent,

    // Optional
    path: '/',
  },
};

export const RouteComponentWrapper = (
  {
    id,

    // Optional
    path,
    index,
    isAuth,
    Element,
    isAdmin,
    routes: childRoutes,
  }: IRoutes,
  authState: AuthState,
) => {
  // Hooks

  // Renders
  if (!authState.initialized)
    return <Route key={id} path={path} element={<AppLoading />} />;

  if (!authState.token && isAuth)
    return (
      <Route
        key={id}
        path={path}
        element={
          <Navigate
            to={Routes.home.routes.products.path || '/'}
            state={{ from: location }}
          />
        }
      />
    );

  if (!authState.token && isAuth && isAdmin && authState.role !== 'admin')
    return (
      <Route
        key={id}
        path={path}
        element={
          <Navigate
            to={Routes.home.routes.products.path || '/'}
            state={{ from: location }}
          />
        }
      />
    );

  if (!authState.token && isAuth)
    return (
      <Route
        key={id}
        path={path}
        element={
          <Navigate to={Routes.signIn.path || '/'} state={{ from: location }} />
        }
      />
    );

  return (
    <Route path={path} element={<Element />} key={id}>
      {index && <Route index element={<Element />} />}
      {childRoutes ? RenderRoutes(childRoutes, authState) : undefined}
    </Route>
  );
};

export const RenderRoutes = (
  routeProps: Record<string, IRoutes>,
  authState: AuthState,
) =>
  Object.values(routeProps).map((route) =>
    RouteComponentWrapper(route, authState),
  );
