import React, {useEffect, useState} from "react";
import {Button, Drawer, Form, Image, Input, InputNumber, message, Table} from "antd";
import {ShoppingCartOutlined, DeleteOutlined} from "@ant-design/icons";
import Header from "app/shared/layout/header/header";
import {useAppSelector} from "app/config/store";
import {ICartLineItem} from "app/shared/model/cart-line-item.model";
import {ColumnsType} from "antd/es/table";
import {getEntityByUserId} from "app/entities/cart/cart.reducer";
import {useDispatch} from "react-redux";
import $ from "jquery"
import {updateEntities} from "app/entities/cart-line-item/cart-line-item.reducer";
import {ILineItem} from "app/shared/model/line-item.model";
import {IOrders} from "app/shared/model/orders.model";
import {createEntity} from "app/entities/orders/orders.reducer";




function Cart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkOutDrawerOpen, setCheckOutDrawerOpen] = useState(false)
  const [dataSource, setDataSource] = useState(JSON.parse(localStorage.getItem("cartLineItemList")))
  const account = useAppSelector(state=>state.authentication.account)
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const [form] = Form.useForm();
  const onClickMinus=(e)=>{
    const quantityInputElement = e.target.nextElementSibling.children.item(1).children.item(0)
    if (quantityInputElement.value>1){
      quantityInputElement.value-=1;
    }
    dataSource.map(p=>{
      if (Number(p.productId)===Number(quantityInputElement.id)){
        p.quantity=Number(quantityInputElement.value);
      }
      return p
    })
    localStorage.setItem("cartLineItemList", JSON.stringify(dataSource))
    setDataSource(JSON.parse(localStorage.getItem("cartLineItemList")))
    // dispatch(updateEntities(JSON.parse(localStorage.getItem("cartLineItemList"))))
  }

  const onClickPlus=(e)=>{
    const quantityInputElement = e.target.previousElementSibling.children.item(1).children.item(0)
    if (Number(quantityInputElement.value)<Number(quantityInputElement.ariaValueMax)){
      quantityInputElement.value=Number(quantityInputElement.value)+1
    } else{
      quantityInputElement.value=Number(quantityInputElement.ariaValueMax)
    }
    dataSource.map(p=>{
      if (Number(p.productId)===Number(quantityInputElement.id)){
        p.quantity=Number(quantityInputElement.value);
      }
      return p
    })
    localStorage.setItem("cartLineItemList", JSON.stringify(dataSource))
    setDataSource(JSON.parse(localStorage.getItem("cartLineItemList")))
    // dispatch(updateEntities(JSON.parse(localStorage.getItem("cartLineItemList"))))
  }


  const onChange=(event)=>{
    event=5
  }

  const onInput=(event)=>{
  }

  const onBlur=(event)=>{
    let newQuantity = event.target.value
    const maxQuantity = event.target.ariaValueMax
    if (Number(newQuantity)>Number(maxQuantity)){
      newQuantity = maxQuantity
    }
    if (newQuantity===""||newQuantity===null||Number(newQuantity)===0){
      newQuantity = 1
    }
    dataSource.map(p=>{
      if (Number(p.productId)===Number(event.target.id)){
        p.quantity=Number(newQuantity);
      }
      return p
    })
    localStorage.setItem("cartLineItemList", JSON.stringify(dataSource))
    setDataSource(JSON.parse(localStorage.getItem("cartLineItemList")))
  }

  const onKeyDown=(e)=>{
    if ((e.code === 'ArrowLeft') || (e.code === 'ArrowRight') ||
      (e.code === 'ArrowUp') || (e.code === 'ArrowDown') ||
      (e.code === 'Delete') || (e.code === 'Backspace') ||
      (e.code === 'Tab') ||
      (e.ctrlKey===true)) {
      return;
    } else if((e.code === 'Enter')||(e.code==='NumpadEnter')){
      e.target.blur()
    } else if (e.key.search(/\d/) === -1) {
      e.preventDefault();
    }
  }

  const onPaste=(e)=>{
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if(!isNaN(pastedData) && !pastedData.includes("-") && !pastedData.includes("+") && !pastedData.includes("e") && !pastedData.includes(".")){
        e.target.value=pastedData
    }
  }

  const render1 = (_,record) => {
    return (record.price*record.quantity).toLocaleString()
  }


  const render2 = (_,record) => {
    return <div id={`quantityInput${record.productId}`} className={"quantity"}>
      <button id={`minusButton${record.productId}`} className={"minusButton"} onClick={onClickMinus} >-</button>

      <InputNumber id={`${record.productId}`} max={record.maxQuantity} className={"quantityInput"} onBlur={onBlur} onKeyDown={onKeyDown} onPaste={onPaste} value={record.quantity}/>

      <button id={`plusButton${record.productId}`} className={"plusButton"} onClick={onClickPlus} >+</button>
    </div>
    // return(
    //   <Form initialValues={{["input"]:record.quantity}}>
    //     <Form.Item name={"input"}>
    //       <InputNumber className={"quantityInput"} value={record.quantity}/>
    //     </Form.Item>
    //   </Form>
    // )
  };

  const render3 = (value, record)=>{
    return(
      <Image style={{width:"100px", height:"100px"}} src={`http://localhost:8080/content/productImages/${record.imageUrl}`}></Image>)
  }

  const render4 = (value, record)=>{
    return(
      <Button title={"Xóa"} onClick={(event => {
        const newDataSource = dataSource.filter(p=>{
          return Number(p.productId)!==Number(record.productId)
        })
        setDataSource(newDataSource)
        localStorage.setItem("cartLineItemList", JSON.stringify(newDataSource))
      })}><DeleteOutlined/></Button>
    )
  }

  const renderDefault = (value, record)=>{
    return(
      <p></p>
    )
  }

  const render5 = (value)=>{
    return value.toLocaleString()
  }

  const columns: ColumnsType<ICartLineItem> = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName'
    },
    {
      title:'Hình Ảnh',
      dataIndex:'imageUrl',
      render:render3
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      render:render5
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      render:render2
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'total',
      render: render1
    },
    {
      title: 'Thao Tác',
      dataIndex: 'action',
      render:render4
    }

  ]

  const columns2: ColumnsType<ICartLineItem> = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName'
    },
    {
      title:'Hình Ảnh',
      dataIndex:'imageUrl',
      render:render3
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      render:render5
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'total',
      render: render1
    }
  ]
  const onConfirmOrder = (values) =>{
    setCartDrawerOpen(false)
    setCheckOutDrawerOpen(false)
    const today = new Date()
    const lineItemList: ILineItem[] = dataSource.map((cartLineItem, i)=>{
      return{
        id:null,
        productId: cartLineItem.productId,
        productName:cartLineItem.productName,
        orderId: null,
        price: cartLineItem.price,
        quantity: cartLineItem.quantity,
        discount: cartLineItem.discount
      }
    })
    const order :IOrders = {
      id:null,
      userId:account.id,
      userName:account.name,
      orderDate:today,
      status:"Pending",
      shipPrice:null,
      shipperName:null,
      shipperPhone:null,
      lineItemDTOList: lineItemList,
      customerName:values.customer_name,
      customerPhone:values.customer_phone,
      customerAddress:values.customer_address
    }
    localStorage.setItem("cartLineItemList","[]")
    dispatch(createEntity(order))
    window.console.log(order)
    message.success("Đặt Hàng Thành Công")
  }


  const formItemLayout = {
    labelCol: {
      span:4
    },
    wrapperCol: {
      span:12
    },
  };

  useEffect(()=>{
    if(account){
      form.setFieldsValue({
        customer_name:account.fullName,
        customer_address:account.address,
        customer_phone:account.phone
      })
    }
  }, [account])

  return (
    <div>
      <div onClick={() => {
        setCartDrawerOpen(true)
        setDataSource(JSON.parse(localStorage.getItem("cartLineItemList")))
      }}>
        <ShoppingCartOutlined></ShoppingCartOutlined>
        {" "}
        Giỏ Hàng
      </div>

      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false)
        }}
        title="Giỏ Hàng"
        contentWrapperStyle={{ width: 800 }}
        footer={<><Button onClick={() => {
          if (dataSource?.length===0||dataSource===null) {
            message.warn("Bạn không có sản phẩm trong giỏ hàng", 1)
          } else {
            setCheckOutDrawerOpen(true)
          }
        }} type="primary">Mua Hàng</Button>
        {" "}
          <span>Tổng Cộng: {total.toLocaleString()}</span></>}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          summary={(record) => {
            const totalDrawer = record.reduce((pre, current) => {
              return pre + (current.price*current.quantity)
            }, 0)
            setTotal(totalDrawer)
            return <></>;
          }}
        >
        </Table>
      </Drawer>
      <Drawer
        open={checkOutDrawerOpen}
        onClose={() => {
          setCheckOutDrawerOpen(false)
        }}
        title="Xác Nhận Đặt Hàng"
        contentWrapperStyle={{ width: 800 }}
        footer={<>
          <Button form={"orderForm"} type="primary" htmlType={"submit"}>Đặt Hàng</Button>
          {" "}
          <span>Tổng Cộng: {total.toLocaleString()}</span>
        </>}
      >
        <Form id={"orderForm"} {...formItemLayout} form={form} onFinish={onConfirmOrder}>
          <Form.Item  label="Tên " name="customer_name" rules={[{
            required:true,
            message:"Vui lòng cập nhật tên trong Thông Tin Cá Nhân"
          }]}>
            <Input ></Input>
          </Form.Item>

          <Form.Item label="Địa Chỉ" name="customer_address" rules={[{
            required:true,
            message:"Vui lòng cập nhật địa chỉ trong Thông Tin Cá Nhân"
          }]}>
            <Input ></Input>
          </Form.Item>

          <Form.Item  label="Số Điện Thoại" name="customer_phone" rules={[{
            required:true,
            message:"Vui lòng cập nhật số điện thoại trong Thông Tin Cá Nhân"
          }]}>
            <Input ></Input>
          </Form.Item>
          <Table
            pagination={false}
            columns={columns2}
            dataSource={dataSource}
            summary={(record) => {
              const totalDrawer = record.reduce((pre, current) => {
                return pre + (current.price*current.quantity)
                setTotal(totalDrawer)
              }, 0)
              return <></>
            }}
          >

          </Table>

        </Form>
      </Drawer>
    </div>
  )
};

export default Cart;
