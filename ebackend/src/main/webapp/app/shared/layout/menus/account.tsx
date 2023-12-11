import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import {Dropdown, Menu, Space, Button} from "antd";
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom"
const accountMenuItemsAuthenticated = (
  <Menu>
    <Link to={"/account/settings"}>
      <Menu.Item>Thông Tin Cá Nhân</Menu.Item>
    </Link>
    <Link to={"/account/password"}>
      <Menu.Item>Đổi Mật Khẩu</Menu.Item>
    </Link>
    <Link to={"/logout"}>
      <Menu.Item>Đăng Xuất</Menu.Item>
    </Link>
  </Menu>
);

const accountMenuItems = (
  <Menu>
    <Link to={"/login"}>
      <Menu.Item>Đăng Nhập</Menu.Item>
    </Link>
  </Menu>

);

export const AccountMenu = ({ isAuthenticated = false, account = null }) => (
    <Dropdown overlay={isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}>
      {(account.login!=null)?
        <Space><UserOutlined/>{account.login}</Space>
        :<Space><UserOutlined/>Tài Khoản</Space>
      }
    </Dropdown>
);

export default AccountMenu;
