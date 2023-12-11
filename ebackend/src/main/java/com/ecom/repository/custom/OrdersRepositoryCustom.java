package com.ecom.repository.custom;

import com.ecom.domain.Orders;
import com.ecom.service.dto.OrdersDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrdersRepositoryCustom {
    Page<Orders> searchOrders(Pageable pageable, String search);
    Optional<OrdersDTO> findOrderById(Long id);
    List<OrdersDTO> findAllByUserId(Long id,  String status);
    List<OrdersDTO> findAllNoPageable();
}
