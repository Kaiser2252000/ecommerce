import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Button, Input, message, Table} from 'antd';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ColumnsType} from "antd/es/table/Table";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import {getEntities, getEntitiesNoPageable} from './category.reducer';

export const Category = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();


  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);
  const totalItems = useAppSelector(state => state.category.totalItems);

  useEffect(()=>{
    dispatch(getEntitiesNoPageable())
  }, [])










  const handleSyncList = () => {
    dispatch(getEntitiesNoPageable())
  };

  interface DataType{
    key:string;
    id:bigint;
    name:string;
    parentId:string;
    status:boolean;
  }

  const columns: ColumnsType<DataType>=[
    {
      title:"Mã Danh Mục",
      dataIndex:"id"
    },
    {
      title:"Tên Danh Mục",
      dataIndex:"name"
    },
    {
      title:"Thuộc Danh Mục Cha",
      dataIndex:"parentId"
    },
    {
      title:"Tình Trạng",
      dataIndex:"status",
      render:(_,record) => {
        return <p>{record.status===true?'Activated':'Deactived'}</p>
      }
    },
    {
      title:"Thao Tác",
      dataIndex:"actions",
      render:(_,record)=>(
        <>
          <Link to={`/admin/category/${record.id}`}><EyeOutlined/></Link>
          <Link to={`/admin/category/${record.id}/edit`} style={{color:"green",marginLeft:12}}><EditOutlined/></Link>
          <Link to={`/admin/category/${record.id}/delete`} style={{color:"red", marginLeft:12}}><DeleteOutlined/></Link>
        </>
      )
    }
  ]

  const data: ColumnsType<DataType> =
    categoryList.map((category,i)=>({
      key:i,
      id:category.id,
      name:category.name,
      parentId:category.parentId,
      status:category.status
    }))

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
      <h2 id="category-heading" data-cy="CategoryHeading">
        <h2>Danh Mục</h2>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            Làm Mới
          </Button>
          <Link to="/admin/category/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            Thêm Danh Mục
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
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
          pagination={false}
        ></Table>
      </div>
    </div>
  );
};

export default Category;
