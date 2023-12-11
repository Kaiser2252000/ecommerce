import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';
import "antd/dist/antd.css";
import React, { useEffect } from 'react';
import {Card, Layout, Menu} from 'antd';
import  {AdminMenu, EntitiesMenu } from 'app/shared/layout/menus';

// import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import ScrollToTop from "app/scroll/scrollToTop";

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const account = useAppSelector(state=>state.authentication.account)

  const paddingTop = '60px';
  return (
    <BrowserRouter basename={baseHref}>
      <ScrollToTop/>
        <Layout>
            <Header
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              currentLocale={currentLocale}
              ribbonEnv={ribbonEnv}
              isInProduction={isInProduction}
              isOpenAPIEnabled={isOpenAPIEnabled}
              account={account}
            />
          <Layout style={{minHeight:"1000px"}}>
            {isAuthenticated && <Card style={{width:"20vw"}}><EntitiesMenu /></Card>}
            <Card style={{width:"100vw"}}>
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Card>
          </Layout>
          <Footer></Footer>
        </Layout>
    </BrowserRouter>
  );
};

export default App;
