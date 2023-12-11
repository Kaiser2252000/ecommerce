import React, {useEffect, useState} from 'react';
import {Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import {DatePicker, Form, Image, Input, message, Select} from "antd";
import moment from 'moment';
import * as path from 'path';



export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);
  const[imageData, setImageData] = useState(null)
  const[imageSource,setImageSource] = useState("")
  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:16
    },
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

  return (
    <div className={"profile"}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>Thông Tin Cá Nhân</h2>
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
        <Form.Item label={"Ảnh Đại Diện"} name={"imageUrl"}>
          <Image src={imageSource}></Image>
        </Form.Item>
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
