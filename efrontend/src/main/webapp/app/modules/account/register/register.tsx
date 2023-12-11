import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import {Form, Input, message} from "antd";

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ email, firstPassword }) => {
    dispatch(handleRegister({ login: email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);

  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:12
    },
  };

  return (
    <div className={"register"}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="register-title">
            Đăng Ký
          </h2>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        onFinish={handleValidSubmit}
      >
        <Form.Item
          name={"email"}
          label={"Email"}
          rules={[
            {
              required:true,
              message:"Vui lòng nhập email"
            },
            {
              min:5,
              message:"Email cần có ít nhất 5 ký tự"
            },
            {
              max:254,
              message:"Email dài tối đa 50 ký tự"
            },
            {
              validator(_,value){
                if(isEmail(value)) return Promise.resolve()
                return Promise.reject(new Error("Email không hợp lệ"))
              }
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder={"Nhập Email"}
          >

          </Input>
        </Form.Item>
        <Form.Item
          name={"firstPassword"}
          label={"Mật Khẩu"}
          rules={[
            {
              required:true,
              message:"Vui Lòng Nhập Mật Khẩu"
            },
            {
              min:8,
              message:"Mật Khẩu Phải Có Độ Dài Tối Thiểu 8 Ký Tự"
            },
            {
              max:16,
              message:"Mật Khẩu Phải Có Độ Dài Tối Đa 16 Ký Tự"
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder={"Mật Khẩu"}
            type={"password"}
          ></Input>
        </Form.Item>
        <Form.Item
          name={"secondPassword"}
          label={"Xác Nhận Mật Khẩu"}
          rules={[
            {
              required:true,
              message:"Vui Lòng Xác Nhận Mật Khẩu"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('firstPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('2 Mật Khẩu Không Trùng Khớp'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            placeholder={"Xác Nhận Mật Khẩu"}
            type={"password"}
          ></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          <Button  color="success" type="submit" data-cy="submit">
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
