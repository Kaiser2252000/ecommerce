import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './category.reducer';
import Avatar from "antd/es/avatar/avatar";
import {Descriptions} from "antd";

export const CategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const categoryEntity = useAppSelector(state => state.category.entity);
  return (
    <div>
      <Descriptions title={"Thông Tin Danh Mục"}>
        <Descriptions.Item label={"Mã Danh Mục"}>{categoryEntity.id}</Descriptions.Item>
        <Descriptions.Item label={"Tên Danh Mục"} span={2}>{categoryEntity.name}</Descriptions.Item>
        <Descriptions.Item label={"Mã Danh Mục Cha"}>{categoryEntity.parentId}</Descriptions.Item>
        <Descriptions.Item label={"Tình Trạng"}>{categoryEntity.status?"Activated":"Deactivated"}</Descriptions.Item>
      </Descriptions>
        <Button tag={Link} to="/admin/category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Trở Về
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/admin/category/${categoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Chỉnh Sửa
          </span>
        </Button>
    </div>
  );
};

export default CategoryDetail;
