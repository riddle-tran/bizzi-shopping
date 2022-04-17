import React, { Suspense, useContext, useEffect } from 'react';
import { Routes as RoutesDom } from 'react-router-dom';

import { RenderRoutes, Routes } from 'Router';
import { AuthContext } from 'context/AuthContext';
import AppLoading from 'components/AppLoading/AppLoading';

const App = () => {
  const { authState, stored, authDispatch } = useContext(AuthContext);

  useEffect(() => {
    authDispatch({ type: 'initialize', payload: stored });
  }, [authDispatch, stored]);

  return (
    <Suspense fallback={<AppLoading />}>
      <RoutesDom>{RenderRoutes(Routes, authState)}</RoutesDom>
    </Suspense>
  );
};

export default App;
