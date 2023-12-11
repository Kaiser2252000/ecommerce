import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from "app/shared/error/error-boundary-route";

import Profile from './settings/settings';
import Password from './password/password';
import Orders from 'app/entities/orders/order'

const AccountRoutes = () => (
  <div >
    <ErrorBoundaryRoutes>
      <Route path="profile" element={<Profile />} />
      <Route path="password" element={<Password />} />
      <Route path="orders" element={<Orders />}/>
    </ErrorBoundaryRoutes>
  </div>
);

export default AccountRoutes;
