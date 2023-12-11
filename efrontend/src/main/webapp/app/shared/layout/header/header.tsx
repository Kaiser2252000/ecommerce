import './header.scss';

import React, {useState, useEffect} from 'react';

import {Navbar, Nav, NavbarToggler, Collapse} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import {Home, Brand} from './header-components';
import {AdminMenu, EntitiesMenu, AccountMenu} from '../menus';
import {
  Menu,
  Badge,
  Drawer,
  Table,
  InputNumber,
  Button,
  Form,
  Input,
  Typography,
  Checkbox,
  message,
  Space,
  Image
} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom"
import {useAppSelector, useAppDispatch} from "app/config/store";
import {getEntities, getEntitiesNoPageable} from "app/entities/category/category.reducer";

import {ShoppingCartOutlined} from "@ant-design/icons"
import {messages} from "app/config/constants";
import {IUser} from "app/shared/model/user.model";
import Cart from "app/entities/cart/cart";
import {useDispatch} from "react-redux";
import {ColumnsType} from "antd/es/table";
import {ICartLineItem} from "app/shared/model/cart-line-item.model";
import Search from "antd/es/input/Search";
import {searchEntities} from "app/entities/product/product.reducer";

export interface IHeaderProps {
  isAuthenticated: boolean;
  account: IUser;
  // isAdmin: boolean;
  // ribbonEnv: string;
  // isInProduction: boolean;
  // isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const categoryList = useAppSelector(state => state.category.entities);
  const param = useParams()
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getEntitiesNoPageable());
  }, [])
  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  const onSearch = (value)=>{
    if(location.pathname.split("/")[1]==="category") {
      dispatch(searchEntities({
        query: value,
        categoryId: Number(location.pathname.split("/")[2])
      }))
    } else {
      if (value)
      navigate(`/search?query=${value}`)
      else navigate("/")
    }
  }
  return (
    <div className={"appHeader"}>
      <div className={"appHeaderCartAccount"}>
        <Menu mode="horizontal"  >
          <Search placeholder="Tìm kiếm sản phẩm" onSearch={onSearch} style={{ width:"50%", marginTop:"10px", marginLeft:"8px" }} />

          <Menu.Item style={{marginLeft:"auto"}}>
            <AccountMenu isAuthenticated={props.isAuthenticated} account={props.account}/>
          </Menu.Item>
          <Menu.Item>
            <Cart></Cart>
          </Menu.Item>


        </Menu>
      </div>
      <div className={"appHeaderCategory"}>
      <Menu mode="horizontal">
        <Menu.Item title={"Home"}>Home<Link to={"/"}></Link></Menu.Item>
        {
          categoryList.map(category=>{
            const parentId = category.id
            if (category.parentId==null){
              return (<Menu.SubMenu title={category.name}>
                {
                  categoryList.map(subcategory=>{
                    if(subcategory.parentId===parentId){
                      return (<Menu.Item>{subcategory.name}<Link to={`/category/${subcategory.id}`}></Link></Menu.Item>)
                    }
                  })
                }
              </Menu.SubMenu>)
            }
          })
        }
      </Menu>
      </div>
    </div>
  );
}

export default Header;

