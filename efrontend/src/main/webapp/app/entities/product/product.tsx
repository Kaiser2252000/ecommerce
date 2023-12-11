import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {getEntity} from "app/entities/product/product.reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "app/config/store";
import {Button, Card, Image, Input, InputNumber, List, message, Spin, Tag, Typography} from "antd";
import $ from "jquery"


import {PlusOutlined, MinusOutlined} from "@ant-design/icons"
function Product(){
  const param = useParams()
  const dispatch = useDispatch()
  const product = useAppSelector(state => state.product.entity)
  const loading = useAppSelector(state => state.product.loading)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate();
  const account = useAppSelector(state=>state.authentication.account)
  useEffect(()=>{
    dispatch(getEntity(param?.productId))
  }, [param])


  $('.minusButton').unbind("click").click( function(){
    const $input = $(this).siblings('.quantityInput');
    const val = Number($input.val());
    if (val>1){
      $input.val(val-1);
      document.getElementById("quantityInput").setAttribute("value", `${val-1}`)
    } else {
      $input.val(1);
      document.getElementById("quantityInput").setAttribute("value", `${1}`)
    }
  });


  $('.plusButton').unbind("click").click(function(){
    const $input = $(this).siblings('.quantityInput');
    const val = Number($input.val());
    if (val<product.quantity){
      $input.val(val+1);
      document.getElementById("quantityInput").setAttribute("value", `${val+1}`)
    } else {
      $input.val(product.quantity);
      document.getElementById("quantityInput").setAttribute("value", `${product.quantity}`)
    }

  });

  const invalidChars = [
    "-",
    "+",
    ".",
    "e"
  ];

  const inputBox = document.getElementById("quantityInput");

  inputBox?.addEventListener("keydown", function(event) {
    // if (invalidChars.includes(e.key) ){
    //   e.preventDefault();
    //   return false;
    // }
    //
    // return true;
    if ((event.code === 'ArrowLeft') || (event.code === 'ArrowRight') ||
      (event.code === 'ArrowUp') || (event.code === 'ArrowDown') ||
      (event.code === 'Delete') || (event.code === 'Backspace') ||
      (event.code === 'Tab') ||
      (event.ctrlKey===true)) {
      return;
    } else if (event.key.search(/\d/) === -1) {
      event.preventDefault();
    }
  });

  $(".quantityInput").bind("paste", function(e){
    e.preventDefault();
    const pastedData = e.originalEvent.clipboardData.getData('text');
    if(!isNaN(parseInt(pastedData, 10)) && !pastedData.includes("-") && !pastedData.includes("+") && !pastedData.includes("e") && !pastedData.includes(".")){
      $(this).val(pastedData);
      document.getElementById("quantityInput").setAttribute("value", `${pastedData}`)
      if (Number(pastedData)>product.quantity){
        $(this).val(product.quantity);
        document.getElementById("quantityInput").setAttribute("value", `${product.quantity}`)
      }
    }
  }
);
  $(".quantityInput").bind("change", function(e){
    if ($(this).val() ===""||$(this).val() ===null|| Number($(this).val()) === 0 ) {
      $(this).val("1");
      document.getElementById("quantityInput").setAttribute("value", `${1}`)
    }
    else if (Number($(this).val())>product.quantity){
      $(this).val(product.quantity);
      document.getElementById("quantityInput").setAttribute("value", `${product.quantity}`)
    }
    else{
      document.getElementById("quantityInput").setAttribute("value", `${$(this).val()}`)
    }
  });

  const onClick=(event)=>{
    if (account.login==null){
      navigate("/login")
    } else {
      let data = (JSON.parse(localStorage.getItem("cartLineItemList")))
      const check=data.find(p=>(Number(p.productId)===Number(product.id)))
      if (check===undefined) {
        data=  ([...data, {
          id: null,
          cartId:localStorage.getItem("cartId"),
          productId: product.id,
          quantity: Number(document.getElementById("quantityInput").getAttribute("value")),
          productName: product.name,
          discount: product.discount,
          imageUrl: product.imageUrl,
          price: product.price,
          maxQuantity: product.quantity
        }])
      } else {
        data.map(p=>{
          if (Number(p.productId)===Number(product.id)){
            if (Number(p.quantity)+Number(document.getElementById("quantityInput").getAttribute("value"))>Number(p.maxQuantity)){
              p.quantity = Number(p.maxQuantity)
            }else {
              p.quantity += Number(document.getElementById("quantityInput").getAttribute("value"));
            }
          }
          return p
        })
      }

      localStorage.setItem("cartLineItemList", JSON.stringify(data))
      message.success("Thêm Vào Giỏ Hàng Thành Công!")
      // dispatch(updateEntities(JSON.parse(localStorage.getItem("cartLineItemList"))))

    }
  }

  return (
    <Spin spinning={loading}>
      <div className={"singleProduct"}>
        <div className={"singleProductImageContainer"}>
          <Image className={"singleProductImage"} src={`http://localhost:8080/content/productImages/${product.imageUrl}`}></Image>
        </div>
        <div className={"singleProductDetail"} >
          <div style={{paddingLeft:"50px", paddingTop:"20px"}}>
            <h2>{product.name}</h2>
            <h2>
              {
                product.discount
                  ? (<span style={{color:"red"}}>{(product.price - product.price*product.discount/100)?.toLocaleString()}₫</span>)
                  : (<span style={{color:"red"}}>{product.price?.toLocaleString()}₫</span>)
              }
              {" "}
              {
                product.discount
                  ? <Typography.Text delete >{product.price?.toLocaleString()}₫</Typography.Text>
                  : null
              }
              {" "}
              {
                product.discount
                  ? <Tag color={"red"}><h3>Giảm {product.discount}%</h3></Tag>
                  :null
              }
            </h2>
            <div>
            <div className={"quantity"}>
              <button className={"minusButton"}>-</button>
              <input id={"quantityInput"} className={"quantityInput"} type={"number"} min={1} defaultValue={1} ></input>
              <button className={"plusButton"}>+</button>
            </div>
            <span style={{display:"inline-block", marginLeft:"10px"} }>{product.quantity} sản phẩm có sẵn</span>
            </div>
            <br/>
            <div>
              <Button key={1} disabled={product.quantity===0?true:false} onClick={onClick} type={"primary"}>Thêm Vào Giỏ</Button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Product
