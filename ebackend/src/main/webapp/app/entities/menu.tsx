import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import {Home} from "app/shared/layout/header/header-components";
const EntitiesMenu = () => {
  return (
    <Menu  mode="vertical"  style={{ height: '100%', borderRight: 0 }} >
      <Menu.Item>Trang Chủ<Home/></Menu.Item>
      <Menu.Item>Đơn Hàng<Link to={"/admin/orders"}/></Menu.Item>
      <Menu.Item>Danh Mục<Link to={"/admin/category"}/></Menu.Item>
      <Menu.Item>Sản Phẩm<Link to={"/admin/product"}/></Menu.Item>
      <Menu.Item>Người Dùng<Link to={"/admin/user-management"}/></Menu.Item>
    </Menu>
  )
}

export default EntitiesMenu;
