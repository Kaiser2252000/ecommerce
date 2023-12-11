import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form, Input, Select, DatePicker, Checkbox, Upload, message, Image} from 'antd'
import { locales, languages } from 'app/config/translation';
import {getUser, getRoles, updateUser, createUser, reset, saveImage} from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import moment from 'moment';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {EyeTwoTone,EyeInvisibleOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';

const { Option } = Select;
export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;
  const [form] = Form.useForm()

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
      if (imageData!=null) {
        dispatch(saveImage(imageData))
      }
    }
    handleClose();
  };

  const[uploadImageName, setUploadImageName] = useState("")
  const[imageData, setImageData] = useState(null)
  const[imageSource,setImageSource] = useState("")

  useEffect(()=>{
    if(user) {
      form.setFieldsValue({
        id: user.id,
        fullName: user.fullName,
        login: user.login,
        gender: user.gender,
        dateOfBirth:
          user.dateOfBirth ? (
            moment(user.dateOfBirth).isValid() ?
              moment(user.dateOfBirth) : null
          ) : null,
        phone: user.phone,
        address: user.address,
        authorities: user.authorities,
        activated: user.activated,
        imageUrl:user.imageUrl
      })
      setImageSource(`${location.protocol}//${location.host}/content/userImages/${user.imageUrl}`)
      setUploadImageName(user.imageUrl)
    }
  }, [user])

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          {user.id? (
            <h2>Sửa Thông Tin Người Dùng</h2>
          ):(
            <h2>Thêm Người Dùng</h2>
          )}
        </Col>
      </Row>

          <Form
            form={form}
            onFinish={saveUser}
          >
            {user.id ? (
            <Form.Item label={"ID"} name={"id"}>
              <Input/>
            </Form.Item>
              ):null}

            <Form.Item label={"Email"} name={"login"}   rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            {/*<Form.Item label={"Mật Khẩu"} name={"password"} rules={[{ required: true }]}>*/}
            {/*  <Input.Password placeholder="*************" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>*/}
            {/*</Form.Item>*/}
            {!user.id?(
              <>
                <Form.Item
                  name="password"
                  label="Mật Khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

              <Form.Item
                name="confirm"
                label="Xác Nhận Mật Khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Xác Nhận Mật Khẩu',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('2 Mật Khẩu Không Trùng Khớp'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              </>
            ):null}
            <Form.Item label={"Họ Tên"} name={"fullName"} >
              <Input/>
            </Form.Item>

            <Form.Item label="Giới Tính" name="gender" rules={[{ required: true }]}>
              <Select allowClear>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
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

            <Form.Item label="Vai Trò" name="authorities" rules={[{ required: true }]}>
              <Select mode={"multiple"} allowClear>
                <Option value="ROLE_ADMIN">Quản Trị Viên</Option>
                <Option value="ROLE_USER">Khách Hàng</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Tình Trạng" name="activated" valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item label={"Ảnh Đại Diện"}>
              <Image style={{border:"1px solid red",width:"300px", height:"300px"}} src={imageSource}></Image>
            <Upload.Dragger style={{width:"300px"}} beforeUpload={file => {
                if (file.size<=1048576) {
                  let data = new FormData();
                  data.append("file", file)
                  setImageData(data)
                  setUploadImageName(file.name)
                  setImageSource(URL.createObjectURL(file))
                  form.setFieldValue("imageUrl",file.name )
                } else{
                  setImageData(null)
                }
                return false;
              }} multiple={false} listType={"picture-card"} maxCount={1} >Tải Ảnh Lên</Upload.Dragger>
            </Form.Item>
            <Form.Item name={"imageUrl"} valuePropName={"value"}><Input hidden></Input></Form.Item>
            <Button tag={Link} to="/admin/user-management" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                  Trở Về
                </span>
            </Button>
            &nbsp;
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FontAwesomeIcon icon="save" />
              &nbsp;
              Lưu
            </Button>

          </Form>

    </div>
  );
};

export default UserManagementUpdate;
