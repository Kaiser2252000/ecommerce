import React from "react";
import {Dropdown, List, message, Space, Tabs} from 'antd';
import TabPane from "antd/es/tabs/TabPane";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import OrdersList from "app/entities/orders/orders-list";
import {getEntitiesByUserId} from "app/entities/orders/orders.reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "app/config/store";

const Orders = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const account = useAppSelector(state=>state.authentication.account)
  dispatch(getEntitiesByUserId({
    orderStatus:"Pending",
    userId:account.id
  }))
  return (
    <div className={"orders"}>
      <Tabs
        defaultActiveKey="All"
        onChange={(key)=>{
          dispatch(getEntitiesByUserId({
            orderStatus:(key==="All")?null:key,
            userId:account.id
          }))
        }}
        items={[
          {
            label: `Chờ Xác Nhận`,
            key: 'Pending',
            children: <OrdersList></OrdersList>
          },
          {
            label: `Đang Vận Chuyển`,
            key: 'Shipping',
            children: <OrdersList></OrdersList>,
          },
          {
            label: `Hoàn Thành`,
            key: 'Completed',
            children: <OrdersList></OrdersList>,
          },
          {
            label: `Đã Hủy`,
            key: 'Canceled',
            children: <OrdersList></OrdersList>,
          },
        ]}
      />
    </div>
  )
};

export default Orders






