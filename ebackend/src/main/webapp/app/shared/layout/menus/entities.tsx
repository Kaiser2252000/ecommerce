import React from 'react';
import { translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import EntitiesMenuItems from 'app/entities/menu';
import {Layout, Menu} from "antd";
const {Sider} = Layout
export const EntitiesMenu = () => (
  <Sider style={{position:"fixed"}}>
      <EntitiesMenuItems/>
  </Sider>
);
