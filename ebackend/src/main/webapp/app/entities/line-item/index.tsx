import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LineItem from './line-item';
import LineItemDetail from './line-item-detail';
import LineItemUpdate from './line-item-update';
import LineItemDeleteDialog from './line-item-delete-dialog';

const LineItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LineItem />} />
    <Route path="new" element={<LineItemUpdate />} />
    <Route path=":id">
      <Route index element={<LineItemDetail />} />
      <Route path="edit" element={<LineItemUpdate />} />
      <Route path="delete" element={<LineItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LineItemRoutes;
