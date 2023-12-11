import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {message, List, Spin, Table, Image, Card, Button, Typography, Descriptions} from "antd";
import {cancelOrder, getEntities, getEntitiesByUserId} from "app/entities/orders/orders.reducer";
import {useDispatch} from "react-redux";
import {IOrders} from "app/shared/model/orders.model";
import {useAppSelector} from "app/config/store";
import {ColumnsType} from "antd/es/table";
import {ICartLineItem} from "app/shared/model/cart-line-item.model";
import {ILineItem} from "app/shared/model/line-item.model";
import Icon from "antd/es/icon";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const OrdersList = ()=>{
  const param = useParams()
  const dispatch = useDispatch()
  const ordersList = useAppSelector(state => state.orders.entities)
  const account = useAppSelector(state=>state.authentication.account)
  const loading = useAppSelector(state=>state.orders.loading)
  const render3 = (value, record)=>{
    return(
      <Image style={{width:"100px", height:"100px"}} src={`http://localhost:8080/content/productImages/${record.imageUrl}`}></Image>)
  }

  const render1 = (_,record) => {
    return (record.price*record.quantity).toLocaleString()
  }

  const render4 = (value) =>{
    return value.toLocaleString()
  }
  const columns: ColumnsType<ILineItem> = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName'
    },
    {
      title:'Hình Ảnh',
      dataIndex:'imageUrl',
      render:render3
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      render:render4
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'total',
      render: render1
    }
  ]

  return(
    <Spin spinning={loading}>
      <List
        style={{backgroundColor:"rgb(239,239,239)", minHeight:"400px"}}
        grid={{column:1}}
        renderItem={(orders:IOrders)=>{
          return(
            <Card
              style={{ marginTop:"25px", marginBottom:"25px"}}
              title={
                <>
                  <span style={{float:"left"}}>Mã Đơn Hàng: {orders.id}</span>
                  <span style={{float:"right"}}>{
                    orders.status==="Pending"
                    ? "Chờ Xác Nhận"
                      : orders.status==="Shipping"
                    ? "Đang Vận Chuyển"
                      : orders.status==="Completed"
                    ? "Đã Hoàn Thành"
                        :"Đã Hủy"
                  }</span>
                </>}
              key={orders.id}
              cover={
                <div>
                  <Descriptions style={{marginLeft:"20px"}} title={"Thông Tin Đơn Hàng"}>
                    <Descriptions.Item label={"Mã Người Dùng"} span={3}>{loading?"":orders.userId}</Descriptions.Item>
                    <Descriptions.Item label={"Tên Khách Hàng"} >{loading?"":orders.customerName}</Descriptions.Item>
                    <Descriptions.Item label={"Số Điện Thoại Khách Hàng"} span={2}>{loading?"":orders.customerPhone}</Descriptions.Item>
                    <Descriptions.Item label={"Địa Chỉ"} span={3}>{loading?"":orders.customerAddress}</Descriptions.Item>
                    <Descriptions.Item label={"Tên Shipper"} >{loading?"":orders.shipperName}</Descriptions.Item>
                    <Descriptions.Item label={"Số Điện Thoại Shipper"} span={2}>{loading?"":orders.shipperPhone}</Descriptions.Item>
                    <Descriptions.Item label={"Chi Tiết Đơn Hàng"}>
                    </Descriptions.Item>
                  </Descriptions>
                <Table
                bordered
                pagination={false}
                columns={columns}
                dataSource={orders.lineItemDTOList}
                footer={(record) => {
                  const total = record.reduce((pre, current) => {
                    return pre + (current.price*current.quantity)
                  }, 0)
                  return <div style={{height:"30px"}}>
                    <div style={{float:"right", fontSize:"18px"}}>
                      <div>Phí ship: {orders.shipPrice?orders.shipPrice.toLocaleString():""}</div>
                      <div>Tổng Cộng: {orders.shipPrice?(total+orders.shipPrice).toLocaleString():total.toLocaleString()}</div>
                    </div>
                  </div>
                }}
              >
              </Table>
                </div>}
              actions={[

              ]}

            >
              <Button style={{float:"right"}} id={`${orders.id}`} onClick={()=>{
                dispatch(cancelOrder(orders.id))
              }
              } disabled={orders.status!=="Pending"?true:false} key={`${orders.id}`} type={"primary"}>Hủy Đơn Hàng</Button>,
            </Card>
          )
        }}
        dataSource={ordersList}
      >

      </List>
    </Spin>
  );
};

export default OrdersList;
