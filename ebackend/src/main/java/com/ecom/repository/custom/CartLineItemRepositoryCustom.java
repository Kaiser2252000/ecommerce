package com.ecom.repository.custom;

import com.ecom.service.dto.CartLineItemDTO;

import java.util.List;

public interface CartLineItemRepositoryCustom {
    List<CartLineItemDTO> findCartLineItemsByCartId(Long id);
}
