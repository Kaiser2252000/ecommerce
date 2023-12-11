import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Category from './category';
import Product from './product';
import LineItem from './line-item';
import Orders from './orders';
import Bill from './bill';
import UserManagement from "app/modules/administration/user-management/user-management";
import UserManagementRoutes from "app/modules/administration/user-management";
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="category/*" element={<Category />} />
        <Route path="product/*" element={<Product />} />
        <Route path="line-item/*" element={<LineItem />} />
        <Route path="orders/*" element={<Orders />} />
        <Route path="bill/*" element={<Bill />} />
        <Route path="user-management/*" element={<UserManagementRoutes/>} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
