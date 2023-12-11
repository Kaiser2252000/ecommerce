import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col,Button  } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';
import {Form, Input, message} from "antd";

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    } else if (errorMessage) {
      message.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:16
    },
  };

  return (
    <div className={"password"}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">Đổi Mật Khẩu</h2>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        onFinish={handleValidSubmit}
      >
        <Form.Item
          name={"currentPassword"}
          label={"Mật Khẩu Hiện Tại"}
          rules={[
            {
              required:true,
              message:"Vui Lòng Nhập Mật Khẩu Hiện Tại"
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder={"Mật Khẩu Hiện Tại"}
            type={"password"}
          ></Input>
        </Form.Item>
        <Form.Item
          name={"newPassword"}
          label={"Mật Khẩu Mới"}
          rules={[
            {
              required:true,
              message:"Vui Lòng Nhập Mật Khẩu Mới"
            },
            {
              min:8,
              message:"Mật Khẩu Mới Phải Có Độ Dài Tối Thiểu 8 Ký Tự"
            },
            {
              max:16,
              message:"Mật Khẩu Mới Phải Có Độ Dài Tối Đa 16 Ký Tự"
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder={"Mật Khẩu Mới"}
            type={"password"}
          ></Input>
        </Form.Item>
        <Form.Item
          name={"confirmPassword"}
          label={"Xác Nhận Mật Khẩu"}
          rules={[
            {
              required:true,
              message:"Vui Lòng Xác Nhận Mật Khẩu"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
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
          <Button color="success" type="submit" data-cy="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default PasswordPage;
