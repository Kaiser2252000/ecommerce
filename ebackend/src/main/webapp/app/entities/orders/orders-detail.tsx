import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './orders.reducer';
import {Descriptions, Spin, Table} from "antd";
import {ILineItem} from "app/shared/model/line-item.model";
import {ColumnsType} from "antd/lib/table";
// import {toast} from "react-toastify";
// import loading = toast.loading;

export const OrdersDetail = () => {
  const dispatch = useAppDispatch();
  const ordersEntity = useAppSelector(state => state.orders.entity)
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const loading = useAppSelector(state=> state.orders.loading)

  const data : ILineItem[] =
    ordersEntity.lineItemDTOList?.map((lineItem) =>({
      id:lineItem.id,
      productId:lineItem.productId,
      productName:lineItem.productName,
      orderId:lineItem.orderId,
      price:lineItem.price,
      quantity:lineItem.quantity,
      discount:lineItem.discount
    }))

  const columns: ColumnsType<ILineItem> = [
    {
      title:"Tên Sản Phẩm",
      dataIndex:"productName"
    },
    {
      title:"Giá Tiền",
      dataIndex:"price"
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity"
    },
    {
      title:"Thành Tiền",
      render:(_,record)=>{
        return <>{record.price * record.quantity}</>;
      }
    }
  ]
  return (
    <div>
      <Spin spinning={loading}>
        <Descriptions title={"Thông Tin Đơn Hàng"}>
          <Descriptions.Item label={"Mã Đơn Hàng"} span={3}>{loading?"":ordersEntity.id}</Descriptions.Item>
          <Descriptions.Item label={"Mã Người Dùng"}>{loading?"":ordersEntity.userId}</Descriptions.Item>
          <Descriptions.Item label={"Tên Khách Hàng"} span={2}>{loading?"":ordersEntity.customerName}</Descriptions.Item>
          <Descriptions.Item label={"Số Điện Thoại"} >{loading?"":ordersEntity.customerPhone}</Descriptions.Item>
          <Descriptions.Item label={"Địa Chỉ"} span={2}>{loading?"":ordersEntity.customerAddress}</Descriptions.Item>
          <Descriptions.Item label={"Chi Tiết Đơn Hàng"}>
          </Descriptions.Item>
        </Descriptions>
      <Table dataSource={data} columns={columns} pagination={false}
             footer={(record) => {
               const total = record.reduce((pre, current) => {
                 return pre + (current.price*current.quantity)
               }, 0)
               return <div style={{height:"30px"}}>
                 <div style={{alignContent:"right", float:"right", fontSize:"18px"}}>
                   <div>Phí ship: {ordersEntity.shipPrice}</div>
                   <div>Tổng Cộng: {total+ordersEntity.shipPrice}</div>
                 </div>
               </div>
             }}
      >

      </Table>
        <Button tag={Link} to="/admin/orders" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/admin/orders/${ordersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Spin>
    </div>
  );
};

export default OrdersDetail;
