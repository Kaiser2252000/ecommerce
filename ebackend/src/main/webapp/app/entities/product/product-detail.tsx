import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';
import {Avatar, Descriptions} from "antd";
import {FileImageOutlined} from "@ant-design/icons";

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <div>
      <Avatar size={64} src={productEntity.imageUrl} icon={<FileImageOutlined style={{verticalAlign:5}}/>} ></Avatar>
      <Descriptions title={"Thông Tin Sản Phẩm"}>
        <Descriptions.Item label="Mã Sản Phẩm">{productEntity.id}</Descriptions.Item>
        <Descriptions.Item label="Tên Sản Phẩm" span={2}>{productEntity.name}</Descriptions.Item>
        <Descriptions.Item label="Giá Tiền">{productEntity.price}</Descriptions.Item>
        <Descriptions.Item label="Số Lượng" span={2}>{productEntity.quantity}</Descriptions.Item>
        <Descriptions.Item label="Mã Danh Mục">{productEntity.categoryId}</Descriptions.Item>
        <Descriptions.Item label="Tên Thương Hiệu" span={2}>{productEntity.brand}</Descriptions.Item>
        <Descriptions.Item label="Mô Tả" span={3}>{productEntity.description}</Descriptions.Item>
        <Descriptions.Item label="Khuyến Mại">{productEntity.discount}</Descriptions.Item>
        <Descriptions.Item label="Ngày Bắt Đầu">{productEntity.discountStartDate}</Descriptions.Item>
        <Descriptions.Item label="Ngày Kết Thúc">{productEntity.discountEndDate}</Descriptions.Item>
      </Descriptions>
      <Button tag={Link} to="/admin/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Trở Về
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/admin/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Chỉnh Sửa
          </span>
        </Button>
    </div>
  );
};

export default ProductDetail;
