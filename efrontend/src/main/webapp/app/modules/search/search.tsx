import './search.scss';
import {ShoppingCartOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from 'react';

import { useAppSelector } from 'app/config/store';
import {useDispatch} from "react-redux";
import {getEntities as getProducts, getEntitiesNoPageable, searchEntities} from "app/entities/product/product.reducer";
import {Button, Card, Image, List, message, Typography} from "antd";
import {IProduct} from "app/shared/model/product.model";
import {Link, useNavigate, useParams} from "react-router-dom";
import {windowSize} from "react-jhipster";
import {createEntity as createCartEntity, getEntityByUserId} from "app/entities/cart/cart.reducer";
import {defaultValue as defaultValueCart} from "app/shared/model/cart.model";
import {
  createEntity as createCartLineItem,
  updateEntities,
  updateEntity as updateCartLineItem
} from "app/entities/cart-line-item/cart-line-item.reducer";
import {useAppDispatch} from "app/config/store";
import {wait} from "fork-ts-checker-webpack-plugin/lib/utils/async/wait";
import {ICartLineItem} from "app/shared/model/cart-line-item.model";
import Search from "antd/es/input/Search";

const productArray= []

export const SearchPage = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const productList = useAppSelector(state=>state.product.entities);
  const loading = useAppSelector(state=>state.product.loading)
  const [grid, setGrid] = useState(5)
  const account = useAppSelector(state=>state.authentication.account)
  const loadingAccount = useAppSelector(state=>state.authentication.loading)
  const navigate = useNavigate();
  const cartEntity = useAppSelector(state=>state.cart.entity)
  const updateSuccessCartLineItem = useAppSelector(state=>state.cartLineItem.updateSuccess)
  const loadingCart = useAppSelector(state=>state.cart.loading)
  const [toggle, setToggle] = useState(true);
  const cartId = localStorage.getItem("cartId");
  const params = new URLSearchParams(location.search)
  let data = JSON.parse(localStorage.getItem("cartLineItemList"))
  useEffect(()=>{
      dispatch(searchEntities({
        query:params.get("query")
      }))
  },[params.get("query")])

  useEffect(()=>{
    if (account.id!==undefined&& localStorage.getItem("cartLineItemList")===null) {
      dispatch(getEntityByUserId(account.id))
    }
  },[account])


  // useEffect(()=>{
  //   if (cartEntity===defaultValueCart && account.id!==undefined){
  //     dispatch(createCartEntity({
  //       userId: account.id
  //     }))
  //   }
  // }, [loadingAccount])

  const onClick=(event)=>{
    const productId = event.target.tagName==="SPAN"? (event.target.parentNode.id): (event.target.id)
    const product = productList.find(p=>(Number(p.id)===Number(productId)))
    if (account.login==null){
      navigate("/login")
    } else {
      data = (JSON.parse(localStorage.getItem("cartLineItemList")))
      const check=data.find(p=>(Number(p.productId)===Number(productId)))
      if (check===undefined) {
        data=  ([...data, {
          id: null,
          cartId,
          productId: product.id,
          quantity: 1,
          productName: product.name,
          discount: product.discount,
          imageUrl: product.imageUrl,
          price: product.price,
          maxQuantity: product.quantity
        }])
      } else {
        data.map(p=>{
          if (Number(p.productId)===Number(productId)){
            if (Number(p.quantity)+1>Number(p.maxQuantity)){
              p.quantity = Number(p.maxQuantity)
            }else {
              p.quantity += 1;
            }
          }
          return p
        })
      }

      localStorage.setItem("cartLineItemList", JSON.stringify(data))
      message.success("Thêm Vào Giỏ Hàng Thành Công!")
      // dispatch(updateEntities(JSON.parse(localStorage.getItem("cartLineItemList"))))

    }
  }


  const onSearch = (value)=>{
    dispatch(searchEntities({
      query:value,
      categoryId:null
    }))
  }

  return (
    <div>
      <List
        grid={{column:grid}}
        loading={loadingCart}
        renderItem={(product:IProduct)=>{
          return (

            <Card className="productCard" title={product.name} key={product.id}
                  cover={<Image preview={false} className={"productCardImage"} src={`http://localhost:8080/content/productImages/${product.imageUrl}`}></Image>}
                  actions={[
                    <Button id={`${product.id}`} onClick={onClick} key={`${product.id}`} type={"primary"}>Thêm Vào Giỏ</Button>,
                    <Link key={2} style={{textDecoration:"none"}} to={`/product/${product.id}`}><Button >Xem Sản Phẩm</Button></Link>
                  ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    {
                      product.discount
                        ? (<Typography.Text type={"danger"}>{`${(product.price - product.price*product.discount/100).toLocaleString()}₫`}</Typography.Text>)
                        : (<Typography.Text type={"danger"}>{`${product.price?.toLocaleString()}₫`}</Typography.Text>)
                    }
                    {" "}
                    {
                      product.discount
                        ? <Typography.Text delete>{product.price.toLocaleString()}₫</Typography.Text>
                        : null
                    }
                  </Typography.Paragraph>}
              >
              </Card.Meta>
              <Card.Meta title={`Số Lượng: ${product.quantity}`}>
              </Card.Meta>
            </Card>
          )
        }}
        dataSource={productList}>
      </List>
    </div>
  )
};

export default SearchPage;
