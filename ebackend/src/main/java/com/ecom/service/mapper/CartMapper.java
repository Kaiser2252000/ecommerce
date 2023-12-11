package com.ecom.service.mapper;

import com.ecom.domain.Cart;
import com.ecom.service.dto.CartDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper extends EntityMapper<CartDTO, Cart>{
}
