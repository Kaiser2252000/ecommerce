import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Link} from "react-router-dom"
import { NavDropdown } from './menu-components';
import {Dropdown, Menu, Space, Button} from "antd";
import {InfoCircleOutlined, DownOutlined, UserOutlined, ProfileOutlined, KeyOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons';
const accountMenuItemsAuthenticated = () => (
  <>
    <Menu>
      <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/account/profile"}>
        <Menu.Item ><InfoCircleOutlined />{"   "}Thông Tin Cá Nhân</Menu.Item>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/account/password"}>
        <Menu.Item><KeyOutlined />{"   "}Đổi Mật Khẩu</Menu.Item>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/account/orders"}>
        <Menu.Item><ProfileOutlined />{"   "}Đơn Hàng</Menu.Item>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/logout"}>
        <Menu.Item><LogoutOutlined />{"   "}Đăng Xuất</Menu.Item>
      </Link>
    </Menu>
  </>
);
const label = "Tài Khoản"
const accountMenuItems = () => (
  <Menu>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/login"}>
      <Menu.Item><LoginOutlined />{"   "}Đăng Nhập</Menu.Item>
    </Link>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/account/register"}>
      <Menu.Item><UserAddOutlined />{"   "}Đăng Ký</Menu.Item>
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
