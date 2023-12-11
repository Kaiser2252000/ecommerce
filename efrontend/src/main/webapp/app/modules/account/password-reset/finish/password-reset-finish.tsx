import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {Form, Input, message} from "antd";

export const PasswordResetFinishPage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ newPassword }) => dispatch(handlePasswordResetFinish({ key, newPassword }));

  const updatePassword = event => setPassword(event.target.value);

  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:16
    },
  };

  const getResetForm = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={handleValidSubmit}
      >
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
          <Button  color="success" type="submit" data-cy="submit">
            Đặt Lại Mật Khẩu
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      message.success(translate(successMessage));
    }
  }, [successMessage]);

  return (
    <div className={"password-reset-finish"}>
      <Row className="justify-content-center">
        <Col md="4">
          <h2>
            Đặt Lại Mật Khẩu
          </h2>

        </Col>
      </Row>
      <div>{key ? getResetForm() : null}</div>
    </div>
  );
};

export default PasswordResetFinishPage;
