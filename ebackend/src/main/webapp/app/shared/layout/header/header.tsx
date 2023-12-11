import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import {Layout, Menu, Space} from "antd"
import type { MenuProps } from 'antd';
import {IUser} from "app/shared/model/user.model";
export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
  account: IUser;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();


  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
      <Menu mode="horizontal" style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        {/*<Space></Space>*/}
        <Menu.Item style={{marginLeft:"auto"}} >
          <AccountMenu isAuthenticated={props.isAuthenticated} account={props.account}/>
        </Menu.Item>
      </Menu>
  )
}

export default Header;
