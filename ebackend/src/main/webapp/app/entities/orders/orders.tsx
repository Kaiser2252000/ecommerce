import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Button, Input, Select, Table, Tag, notification} from 'antd';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ColumnsType} from "antd/es/table/Table";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IOrders } from 'app/shared/model/orders.model';
import {getEntities, getEntitiesNoPageable, updateStatus} from './orders.reducer';
import {Option} from "antd/es/mentions";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const notificationKey = [];
let notificationCount = 0
export const Orders = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();


  const [api, contextHolder] = notification.useNotification();
  const ordersList = useAppSelector(state => state.orders.entities);
  const loading = useAppSelector(state => state.orders.loading);
  const totalItems = useAppSelector(state => state.orders.totalItems);
  const updating = useAppSelector(state => state.orders.updating);
  const updateSuccess = useAppSelector(state => state.orders.updateSuccess);

  useEffect(()=>{
    dispatch(getEntitiesNoPageable())
  }, [])

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getEntitiesNoPageable())
    }

  }, [updateSuccess]);












  const handleSyncList = () => {
    dispatch(getEntitiesNoPageable())
  };

  const onChangeStatus = (value, event) => {
    window.console.log(event.className)
    dispatch(updateStatus({id:event.className, status:value}));
    // else notification.close("updateStatus");
        api["info"]({
            key: `${event.className}${notificationCount}pending`,
            message: 'Thông Báo',
            description:
              `Đang Cập Nhật Trạng Thái Đơn Hàng ${event.className}`
          });
        notificationKey.push(`${event.className}`)
        notificationCount++;
  };

  useEffect(()=>{
    while (updateSuccess && notificationKey[0]!=undefined) {
      api["success"]({
        key: `${notificationKey[0]}${notificationCount}success`,
        message: "Thông Báo",
        description:
          `Cập Nhật Trạng Thái Đơn Hàng ${notificationKey[0]} Thành Công`
      })
      notificationKey.shift();
      notificationCount++;
    }
  }, [updateSuccess])



  interface DataType{
    key:string;
    id:bigint;
    userId:string;
    orderDate:string;
    customerName:string;
    customerAddress:string;
    customerPhone:string;
    status:string;
  }

  const columns: ColumnsType<DataType>=[
    {
      title:"Mã Đơn Hàng",
      dataIndex:"id"
    },
    {
      title:"Mã Người Dùng",
      dataIndex:"userId"
    },
    {
      title:"Ngày Đặt",
      dataIndex:"orderDate"
    },
    {
      title:"Tên Khách Hàng",
      dataIndex:"customerName"
    },
    {
      title:"Số Điện Thoại",
      dataIndex:"customerPhone"
    },
    {
      title:"Địa Chỉ",
      dataIndex:"customerAddress"
    },
    {
      title:"Trạng Thái",
      dataIndex:"status",
      render:(_,record)=>(
          <Select style={{width:180}} value={record.status} onChange={(value, event) => {onChangeStatus(value,event)}}>
            <Option className={`${record.id}`} value={"Pending"}>Chờ Xác Nhận</Option>
            <Option className={`${record.id}`} value={"Shipping"}>Đang Vận Chuyển</Option>
            <Option className={`${record.id}`} value={"Canceled"}>Đã Hủy</Option>
            <Option className={`${record.id}`} value={"Completed"}>Hoàn Thành</Option>
          </Select>
      )
    },
    {
      title:"Thao Tác",
      dataIndex:"actions",
      render:(_,record)=>(
        <>
          <Link to={`/admin/orders/${record.id}`}><EyeOutlined/></Link>
          <Link to={`/admin/orders/${record.id}/delete`} style={{color:"red", marginLeft:12}}><DeleteOutlined/></Link>
        </>
      )
    }
  ]

  const data:DataType[] =
    ordersList.map((order,i)=>({
      key:i,
      id:order.id,
      userId:order.userId,
      orderDate:order.orderDate,
      customerName:order.customerName,
      customerPhone:order.customerPhone,
      customerAddress:order.customerAddress,
      status:order.status
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
      {contextHolder}
      <h2 id="orders-heading" data-cy="OrdersHeading">
        <h2>Đơn Hàng</h2>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            Làm Mới
          </Button>
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

export default Orders;
