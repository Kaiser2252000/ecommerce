package com.ecom.service.mapper;

import com.ecom.domain.Orders;
import com.ecom.service.dto.OrdersDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Orders} and its DTO {@link OrdersDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrdersMapper extends EntityMapper<OrdersDTO, Orders> {}
