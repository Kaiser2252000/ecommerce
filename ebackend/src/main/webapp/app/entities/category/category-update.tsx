import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import {getEntity, updateEntity, createEntity, reset, getEntities, getEntitiesNoPageable} from './category.reducer';
import {Checkbox, Form, Input, message, Select} from "antd";
import {Option} from "antd/es/mentions";

export const CategoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categoryEntity = useAppSelector(state => state.category.entity);
  const loading = useAppSelector(state => state.category.loading);
  const updating = useAppSelector(state => state.category.updating);
  const updateSuccess = useAppSelector(state => state.category.updateSuccess);
  const categoryEntities = useAppSelector(state => state.category.entities);
  const [categoryList, setCategoryList] = useState(categoryEntities)
  const handleClose = () => {
    navigate('/admin/category' + location.search);
  };

  useEffect(()=>{
    setCategoryList(categoryEntities)
  }, [categoryEntities])

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getEntitiesNoPageable());
  }, []);



  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...categoryEntity,
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
          ...categoryEntity,
        };

  const [form] = Form.useForm()
  useEffect(()=>{
    if(categoryEntity){
      form.setFieldsValue({
        id:categoryEntity.id,
        name:categoryEntity.name,
        parentId:categoryEntity.parentId,
        status:categoryEntity.status
      })
    }
  }, [categoryEntity])


  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:8
    },
  };

  return (
  <div>
    <Row className="justify-content-center">
      <Col md="8">
        {categoryEntity.id? <h2>Sửa Thông Tin Danh Mục</h2>:<h2>Thêm Danh Mục</h2>}
      </Col>
    </Row>
    <Form {...formItemLayout} form={form} onFinish={saveEntity}>
      {categoryEntity.id ? <Form.Item label={"Mã Danh Mục"} name={"id"}>
          <Input/>
        </Form.Item>:null}
      <Form.Item label={"Tên Danh Mục"} name={"name"} rules={[{required:true}]}>
        <Input/>
      </Form.Item>
      <Form.Item label={"Thuộc Danh Mục Cha"} name={"parentId"}>
        <Select>
          <Option value={null}>Không Có</Option>
          {
            categoryEntities.map(category=>{
              if (category.parentId===null)
              return (<Option value={category.id}>{category.name}</Option>)
            })
          }
        </Select>
      </Form.Item>
      <Form.Item label={"Tình Trạng"} name={"status"} valuePropName={"checked"}>
        <Checkbox></Checkbox>
      </Form.Item>
      <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/admin/category" replace color="info">
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

export default CategoryUpdate;
