import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { Button, Table, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Table, Button, Badge, Tag, Input, Space} from 'antd'
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import {getUsersAsAdminNoPageable, getUsersAsAdmin, updateUser} from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import "antd/dist/antd.css";
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {ColumnsType} from "antd/es/table/Table";
import {ColumnType, FilterConfirmProps} from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("")
  const account = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);

  useEffect(()=>{
    dispatch(getUsersAsAdminNoPageable())
  }, [])











  const handleSyncList = () => {
    dispatch(getUsersAsAdminNoPageable())
  };

  const toggleActive = user => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      })
    );
  };



  interface DataType{
    key:string;
    id:string;
    name:string;
    email:string;
    authorities:string[];
  }

  const columns: ColumnsType<DataType>= [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Vai Trò",
      dataIndex: "authorities",
      render: (authorities: string[]) => (
        <span>
        {authorities.map((authority, key) => {
          let color = "green"
          if (authority==="ROLE_ADMIN"){
            color = "volcano"
          }
          return (
            <Tag key={key} color = {color}>
              {authority}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: "Thao Tác",
      dataIndex: "actions",
      render:(_,record) =>(
        <>
          <Link to={record.email}><EyeOutlined/></Link>
          <Link to={`${record.email}/edit`}><EditOutlined style={{ color: "green", marginLeft: 12 }} /></Link>
          <Link to={`${record.email}/delete`}><DeleteOutlined style={{ color: "red", marginLeft: 12 }}/></Link>
        </>
      )
    }
  ];

  const data: DataType[] =
    users.map((user,i) => ({
      key:i,
      id:user.id,
      name:user.fullName,
      email:user.login,
      authorities:user.authorities
    }))

  const {Search} = Input

  const [filterTable, setFilterTable] = useState(null);

  const onSearch = (value) => {
    // const filterData = data.filter((item) => item.survey.includes(value));
    const filterData = data.filter((o) => Object.keys(o).some((k) => String(o[k])
      .toLowerCase()
      .includes(value.toLowerCase())));
    setFilterTable(filterData);
  };



  return (
    <div>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        <h2>Người Dùng</h2>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            Làm Mới
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Thêm Người Dùng
          </Link>
        </div>
      </h2>
      <Input.Search
        placeholder="Search by..."
        onSearch={onSearch}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filterTable == null ? data : filterTable}
        bordered
        loading={loading}
      >

      </Table>
    </div>
  );
};

export default UserManagement;
