import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProduct } from 'app/shared/model/product.model';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import {getEntities, getEntitiesNoPageable} from "app/entities/category/category.reducer";
import {Form, Image, Input, Select, TreeNodeProps, TreeSelect, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {DatePicker} from "antd/es";
import moment from "moment";
import {Option} from "antd/es/mentions";
import {saveImage} from "./product.reducer";
import {TreeNode} from "antd/es/tree-select";
import {OptionType} from "dayjs";

export const ProductUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const productEntity = useAppSelector(state => state.product.entity);
  const loading = useAppSelector(state => state.product.loading);
  const updating = useAppSelector(state => state.product.updating);
  const updateSuccess = useAppSelector(state => state.product.updateSuccess);
  const categoryEntities = useAppSelector(state => state.category.entities);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState(categoryEntities)
  const handleClose = () => {
    navigate('/admin/product' + location.search);
  };

  const[imageData, setImageData] = useState(null)
  const[imageSource,setImageSource] = useState("")

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id))
    }
    dispatch(getEntitiesNoPageable())
  }, []);

  useEffect(()=>{
    setCategoryList(categoryEntities)
  }, [categoryEntities])

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...productEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
    if (imageData!=null) {
      dispatch(saveImage(imageData))
    }
  };

  useEffect(()=>{
    if(productEntity){
      form.setFieldsValue({
        id:productEntity.id,
        name:productEntity.name,
        price:productEntity.price,
        quantity:productEntity.quantity,
        categoryId:productEntity.categoryId,
        brand:productEntity.brand,
        description:productEntity.description,
        discount:productEntity.discount,
        imageUrl:productEntity.imageUrl,
        discountStartDate:
          productEntity.discountStartDate?(
            moment(productEntity.discountStartDate).isValid()?
              moment(productEntity.discountStartDate):null
          ):null,
        discountEndDate:
          productEntity.discountEndDate?(
            moment(productEntity.discountEndDate).isValid()?
              moment(productEntity.discountEndDate):null
          ):null,
      })
      setImageSource(`${location.protocol}//${location.host}/content/productImages/${productEntity.imageUrl}`)
    }
  },[productEntity])


  const treeData =
    categoryList?.reduce((treeData,category)=>{
      if (category.parentId===null) {
        treeData.push({
          key:category.id,
          value:category.id,
          title:category.name,
          selectable:false,
          children: categoryList.reduce((children, category2)=>{
            if (category2.parentId===category.id){
              children?.push({
                key:category2.id,
                value:category2.id,
                title:category2.name
              })

            }
            return children
          }, [])
        })
      }
      return treeData
    },[]
    )

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          {productEntity.id? (
            <h1>Sửa Thông Tin Sản Phẩm</h1>
          ):(
            <h1>Thêm Sản Phẩm</h1>
          )}
        </Col>
      </Row>
      <div style={{display:"flex", flexDirection:"row"}}>
      <Form style={{width:"50%"}} form={form} onFinish={saveEntity} labelAlign={"left"} labelCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 10 }, lg: { span: 8 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 20 }, lg: { span: 14 } }}>
        {productEntity.id?(
          <Form.Item label={"Mã Sản Phẩm"} name={"id"}>
            <Input readOnly/>
          </Form.Item>
        ):null}
        <Form.Item label={"Tên Sản Phẩm"}  name={"name"} rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Giá Tiền"} name={"price"} rules={[{ required: true, message: 'Vui lòng điền giá tiền' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Số Lượng"} name={"quantity"}>
          <Input/>
        </Form.Item>

        <Form.Item label={"Tên Danh Mục"} name={"categoryId"} rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <TreeSelect treeData={treeData} treeLine={true} multiple={false} treeDefaultExpandedKeys={[productEntity.id]}>

          </TreeSelect>
        </Form.Item>
        <Form.Item label={"Tên Thương Hiệu"} name={"brand"}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Mô Tả"} name={"description"}>
          <TextArea></TextArea>
        </Form.Item>
        <Form.Item label={"Khuyến Mại"} name={"discount"}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Ngày Bắt Đầu"} name={"discountStartDate"}>
          <DatePicker/>
        </Form.Item>
        <Form.Item label={"Ngày Kết Thúc"} name={"discountEndDate"}>
          <DatePicker/>
        </Form.Item>
        <Form.Item name={"imageUrl"} valuePropName={"value"}><Input hidden></Input></Form.Item>


        <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/admin/product" replace color="info">
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
        <div style={{width:"50%", marginLeft:"50px"}}>
          <Image style={{border:"1px solid red",width:"300px", height:"300px"}} src={imageSource}></Image>
          <Upload.Dragger showUploadList={false} style={{width:"300px", maxHeight:"60px"}} beforeUpload={file => {
            if (file.size<=1048576) {
              let data = new FormData();
              data.append("file", file)
              setImageData(data)
              setImageSource(URL.createObjectURL(file))
              form.setFieldValue("imageUrl",file.name )
            } else{
              setImageData(null)
            }
            return false;
          }} multiple={false} listType={"picture-card"} maxCount={1} >Tải Ảnh Lên</Upload.Dragger>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
