import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { locales, languages } from 'app/config/translation';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import moment from "moment";
import {DatePicker, Form, Image, Input, message, Select, Upload} from "antd";
import {saveImage} from "app/modules/administration/user-management/user-management.reducer";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);
  const[imageSource,setImageSource] = useState("")
  const[imageData, setImageData] = useState(null)
  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      message.success(translate(successMessage));
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
    if (imageData!=null) {
      dispatch(saveImage(imageData))
    }
  };

  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldsValue({
      fullName: account.fullName,
      gender: account.gender,
      dateOfBirth:
        account.dateOfBirth ? (
          moment(account.dateOfBirth).isValid() ?
            moment(account.dateOfBirth) : null
        ) : null,
      phone:account.phone,
      address:account.address,
      imageUrl:account.imageUrl
    })
    setImageSource(`http://localhost:8080/content/userImages/${account.imageUrl}`)
  }, [])

  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:16
    },
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Chỉnh Sửa Thông Tin Cá Nhân
          </h2>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={handleValidSubmit}
      >
        <Form.Item label={"Họ Tên"} name={"fullName"} >
          <Input/>
        </Form.Item>
        <Form.Item label="Giới Tính" name="gender" rules={[{ required: true }]}>
          <Select allowClear>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngày Sinh" name="dateOfBirth" >
          <DatePicker placeholder={"Chọn Ngày Sinh"}/>
        </Form.Item>
        <Form.Item label={"Số Điện Thoại"} name={"phone"} rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Địa Chỉ"} name={"address"}>
          <Input/>
        </Form.Item>
        <Form.Item label={"Ảnh Đại Diện"}>
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
        </Form.Item>
        <Form.Item name={"imageUrl"} valuePropName={"value"}><Input hidden></Input></Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          <Button color="primary" type="submit" data-cy="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPage;
