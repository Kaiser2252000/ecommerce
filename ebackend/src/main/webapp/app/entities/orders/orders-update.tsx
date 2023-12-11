import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrders } from 'app/shared/model/orders.model';
import {getEntity, updateEntity, createEntity, reset, getEntitiesNoPageable} from './orders.reducer';
import moment from "moment";
import {Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";

export const OrdersUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const ordersEntity = useAppSelector(state => state.orders.entity);
  const loading = useAppSelector(state => state.orders.loading);
  const updating = useAppSelector(state => state.orders.updating);
  const updateSuccess = useAppSelector(state => state.orders.updateSuccess);
  const [form] = Form.useForm();

  const handleClose = () => {

  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getEntitiesNoPageable())
      navigate('/admin/orders')
    }

  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ordersEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...ordersEntity,
        };

  useEffect(()=>{
    if(ordersEntity){
      form.setFieldsValue({
        id:ordersEntity.id,
        userId:ordersEntity.userId,
        orderDate:ordersEntity.orderDate,
        shipPrice:ordersEntity.shipPrice,
        status:ordersEntity.status,
        shipperName:ordersEntity.shipperName,
        shipperPhone:ordersEntity.shipperPhone,
        customerName:ordersEntity.customerName,
        customerPhone:ordersEntity.customerPhone,
        customerAddress:ordersEntity.customerAddress
    })
  }
  },[ordersEntity])

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ecomApp.orders.home.createOrEditLabel" data-cy="OrdersCreateUpdateHeading">
            Sửa Thông Tin Đơn Hàng
          </h2>
        </Col>
      </Row>
      <Form form={form} onFinish={saveEntity}>
        <Form.Item label={"Mã Đơn Hàng"} name={"id"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Mã Người Dùng"} name={"userId"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Ngày Đặt Hàng"} name={"orderDate"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Tên Khách Hàng"} name={"customerName"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Số Điện Thoại"} name={"customerPhone"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Địa Chỉ"} name={"customerAddress"}>
          <Input readOnly></Input>
        </Form.Item>
        <Form.Item label={"Tên Shipper"} name={"shipperName"}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={"Số Điện Thoại Shipper"} name={"shipperPhone"}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={"Phí Ship"} name={"shipPrice"}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={"Tình Trạng"} name={"status"}>
          <Select>
            <Option value={"Pending"}>Chờ Xác Nhận</Option>
            <Option value={"Shipping"}>Đang Vận Chuyển</Option>
            <Option value={"Canceled"}>Đã Hủy</Option>
            <Option value={"Completed"}>Hoàn Thành</Option>
          </Select>
        </Form.Item>
        <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/admin/orders" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          <span className="d-none d-md-inline">
            Trở Về
          </span>
        </Button>
        &nbsp;
        <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
          <FontAwesomeIcon icon="save" />
          &nbsp;
          Lưu
        </Button>
      </Form>
    </div>
  );
};

export default OrdersUpdate;
