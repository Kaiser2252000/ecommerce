import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Avatar, Descriptions, Tag} from "antd";
import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { UserOutlined } from '@ant-design/icons';
import moment from "moment";
export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div>
      <Avatar size={64} src={user.imageUrl} icon={<UserOutlined style={{verticalAlign:5}}/>} ></Avatar>
      <Descriptions title={"Thông Tin Người Dùng"}>
        <Descriptions.Item label={"Email"}>{user.login}</Descriptions.Item>
        <Descriptions.Item label={"Họ Tên"} span={2}>{user.fullName}</Descriptions.Item>
        <Descriptions.Item label={"Ngày Sinh"}>{
          user.dateOfBirth?
            (moment(user.dateOfBirth).isValid()?moment(user.dateOfBirth).format("YYYY-MM-DD"):null)
            :null
        }</Descriptions.Item>
        <Descriptions.Item label={"Giới Tính"} span={2}>{user.gender}</Descriptions.Item>
        <Descriptions.Item label={"Số Điện Thoại"}>{user.phone}</Descriptions.Item>
        <Descriptions.Item label={"Địa Chỉ"} span={2}>{user.address}</Descriptions.Item>
        <Descriptions.Item label={"Tình Trạng"} >{user.activated?"Activated":"Deactivated"}</Descriptions.Item>
        <Descriptions.Item label={"Vai Trò"} >
          <span>
        {user.authorities.map(authority => {
          let color = "green"
          if (authority==="ROLE_ADMIN"){
            color = "volcano"
          }
          return (
            <Tag color = {color}>
              {authority}
            </Tag>
          );
        })}
      </span>
        </Descriptions.Item>
      </Descriptions>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          Trở Về
        </span>
      </Button>
      &nbsp;
      <Button tag={Link} to={`edit`} replace color="primary">
        <FontAwesomeIcon icon="pencil-alt" />{' '}
        <span className="d-none d-md-inline">
            Chỉnh Sửa
          </span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
