package com.ecom.service.mapper;

import com.ecom.domain.CartLineItem;
import com.ecom.service.dto.CartLineItemDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CartLineItemMapper extends EntityMapper<CartLineItemDTO, CartLineItem>{
}
