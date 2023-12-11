package com.ecom.repository.custom.impl;

import com.ecom.domain.Orders;
import com.ecom.domain.Product;
import com.ecom.repository.custom.OrdersRepositoryCustom;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.ecom.service.dto.OrdersDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class OrdersRepositoryCustomImpl implements OrdersRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Page<Orders> searchOrders(Pageable pageable, String search) {
        String sql = "SELECT o FROM Orders o WHERE 1=1 ";
        if (null != search) {
            sql +=
                "AND (LOWER(STR(o.id)) LIKE LOWER (CONCAT('%',:search,'%')) OR LOWER(STR(o.userId)) LIKE LOWER ( CONCAT('%',:search,'%')))";
        }
        Query query = entityManager.createQuery(sql);
        if (null != search) {
            query.setParameter("search", search);
        }
        List<Orders> list = query.getResultList();
        Long count = query.getResultList().stream().count();
        return new PageImpl<>(list, pageable, count);
    }

    @Override
    public Optional<OrdersDTO> findOrderById(Long id) {
        String SQL = "SELECT orders.id, user_id, sys_user.full_name, order_date, ship_price, status, shipper_name, shipper_phone, customer_name, customer_phone, customer_address FROM orders JOIN sys_user ON orders.user_id = sys_user.id WHERE orders.id = :id";
        Query query = entityManager.createNativeQuery(SQL);
        if (null!=id){
            query.setParameter("id",id);
        }
        List<OrdersDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            OrdersDTO ordersDTO = new OrdersDTO();
            System.out.println(o[0]+" "+o[1]);
            ordersDTO.setId(Long.valueOf(String.valueOf(o[0])));
            ordersDTO.setUserId(Long.valueOf(String.valueOf(o[1])));
            ordersDTO.setUserName((String) o[2]);
            ordersDTO.setOrderDate(LocalDate.parse(String.valueOf(o[3])));
            ordersDTO.setShipPrice((Double) o[4]);
            ordersDTO.setStatus(String.valueOf(o[5]));
            ordersDTO.setShipperName((String) o[6]);
            ordersDTO.setShipperPhone((String) o[7]);
            ordersDTO.setCustomerName((String) o[8]);
            ordersDTO.setCustomerPhone((String) o[9]);
            ordersDTO.setCustomerAddress((String) o[10]);
            list.add(ordersDTO);
        });
        if (list.size()!=0) {
            return Optional.of(list.get(0));
        } else {
            return null;
        }
    }

    @Override
    public List<OrdersDTO> findAllByUserId(Long id, String status) {
        String SQL = "SELECT orders.id, user_id, sys_user.full_name,customer_name, customer_phone, customer_address, order_date, ship_price, orders.status, shipper_name, shipper_phone FROM orders JOIN sys_user ON orders.user_id = sys_user.id WHERE user_id = :id";
        if (null!=status){
            SQL+=" AND orders.status LIKE :status";
        }
        Query query = entityManager.createNativeQuery(SQL);
        if (null!=id){
            query.setParameter("id", id);
        }
        if (null!=status){
            query.setParameter("status",status);
        }
        List<OrdersDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            OrdersDTO ordersDTO = new OrdersDTO();
            ordersDTO.setId(Long.valueOf(String.valueOf(o[0])));
            ordersDTO.setUserId(Long.valueOf(String.valueOf(o[1])));
            ordersDTO.setUserName((String) o[2]);
            ordersDTO.setCustomerName((String) o[3]);
            ordersDTO.setCustomerPhone((String) o[4]);
            ordersDTO.setCustomerAddress((String)o[5]);
            ordersDTO.setOrderDate(LocalDate.parse(String.valueOf(o[6])));
            ordersDTO.setShipPrice((Double) o[7]);
            ordersDTO.setStatus(String.valueOf(o[8]));
            ordersDTO.setShipperName((String) o[9]);
            ordersDTO.setShipperPhone((String) o[10]);
            list.add(ordersDTO);
        });
        return list;
    }

    @Override
    public List<OrdersDTO> findAllNoPageable() {
        String SQL = "SELECT orders.id, user_id, sys_user.full_name,customer_name, customer_phone, customer_address, order_date, ship_price, orders.status, shipper_name, shipper_phone FROM orders JOIN sys_user ON orders.user_id = sys_user.id";

        Query query = entityManager.createNativeQuery(SQL);
        List<OrdersDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            OrdersDTO ordersDTO = new OrdersDTO();
            ordersDTO.setId(Long.valueOf(String.valueOf(o[0])));
            ordersDTO.setUserId(Long.valueOf(String.valueOf(o[1])));
            ordersDTO.setUserName((String) o[2]);
            ordersDTO.setCustomerName((String) o[3]);
            ordersDTO.setCustomerPhone((String) o[4]);
            ordersDTO.setCustomerAddress((String)o[5]);
            ordersDTO.setOrderDate(LocalDate.parse(String.valueOf(o[6])));
            ordersDTO.setShipPrice((Double) o[7]);
            ordersDTO.setStatus(String.valueOf(o[8]));
            ordersDTO.setShipperName((String) o[9]);
            ordersDTO.setShipperPhone((String) o[10]);
            list.add(ordersDTO);
        });
        return list;
    }
}
