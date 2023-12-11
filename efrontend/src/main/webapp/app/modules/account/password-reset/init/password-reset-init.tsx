import React, { useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Button, Alert, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {Form, Input, message} from "antd";

export const PasswordResetInit = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

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
    <div className={"password-reset"}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="register-title">Đặt Lại Mật Khẩu</h2>

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
        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          <Button  color="primary" type="submit" data-cy="submit">
            Đặt Lại Mật Khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordResetInit;
