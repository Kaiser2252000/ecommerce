import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Button } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import {getEntities, getEntitiesNoPageable} from './product.reducer';
import {ColumnsType} from "antd/es/table/Table";
import {DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons";
import {Table, Button, InputRef, Input, Space, Image} from 'antd'
import {ColumnType, FilterConfirmProps} from "antd/es/table/interface";

export const Product = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();



  const productList = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);

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
    price:number;
    quantity:number;
    imageUrl:string;
    categoryId:bigint;
    categoryName:string;
  }
  const columns: ColumnsType<DataType>=[
    {
      title:"Mã Sản Phẩm",
      dataIndex:"id"
    },
    {
      title:"Tên Sản Phẩm",
      dataIndex:"name"
    },
    {
      title:"Giá Tiền",
      dataIndex:"price"
    },
    {
      title:"Số Lượng",
      dataIndex:"quantity"
    },
    {
      title:"Ảnh Sản Phẩm",
      dataIndex:"imageUrl",
      align:"center",
      render:(_,record)=>{
        return (
          <div style={{ marginLeft: "auto", marginRight: "auto"}}>
          <Image src={`/content/productImages/${record.imageUrl}`} style={{height:"80px", width:"80px"}}></Image>
          </div>
        )
        ;
      }
    },
    {
      title:"Loại Sản Phẩm",
      dataIndex:"categoryName"
    },
    {
      title:"Thao Tác",
      dataIndex:"actions",
      align:"center",
      render:(_,record)=>(
        <>
          <Link to={`/admin/product/${record.id}`}><EyeOutlined/></Link>
          <Link to={`/admin/product/${record.id}/edit`} style={{color:"green", marginLeft:12}}><EditOutlined/></Link>
          <Link to={`/admin/product/${record.id}/delete`} style={{color:"red", marginLeft:12}}><DeleteOutlined/></Link>
        </>
      )
    }
  ]

  const data: DataType[]=
    productList.map((product,i)=>({
      key:i,
      id:product.id,
      name:product.name,
      price:product.price,
      quantity:product.quantity,
      imageUrl:product.imageUrl,
      categoryId:product.categoryId,
      categoryName:product.categoryName
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
      <h2 id="product-heading" data-cy="ProductHeading">
        <h2>Sản Phẩm</h2>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            Làm Mới
          </Button>
          <Link to="/admin/product/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            Thêm Sản Phẩm
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
          >
          </Table>
      </div>
    </div>
  );
};

export default Product;
