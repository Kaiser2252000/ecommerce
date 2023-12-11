import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';

import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import AppHeader from 'app/shared/layout/header/header';
import AppFooter from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import PageContent from "app/shared/layout/page-content/page-content";
import {getEntityByUserId} from "app/entities/cart/cart.reducer";
import {Footer} from "antd/es/layout/layout";

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const account = useAppSelector(state=>state.authentication.account)
  // const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  // const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  // const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  // const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';
  return (
    <Router basename={baseHref}>
      <div className="App" >
          <AppHeader
            isAuthenticated={isAuthenticated}
            account={account}
            // isAdmin={isAdmin}
            // ribbonEnv={ribbonEnv}
            // isInProduction={isInProduction}
            // isOpenAPIEnabled={isOpenAPIEnabled}
          />
        <PageContent></PageContent>
      </div>
    </Router>
  );
};

export default App;
