import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import Category from "app/entities/category/category";
import Product from "app/entities/product/product";
import SearchPage from "app/modules/search/search";
const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

// const Admin = Loadable({
//   loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
//   loading: () => loading,
// });

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
        <Route path={"login"} element={<Login />} />
        <Route path={"logout"} element={<Logout />} />
        <Route path={"category/:categoryId"} element={<Category/>}></Route>
        <Route path={"product/:productId"} element={<Product/>}></Route>
        <Route path={"search"} element={<SearchPage/>}></Route>
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
