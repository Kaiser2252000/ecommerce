package com.ecom.service;

import com.ecom.service.dto.CartLineItemDTO;
import com.ecom.service.dto.LineItemDTO;
import liquibase.pro.packaged.C;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CartLineItemService {

    CartLineItemDTO save(CartLineItemDTO cartLineItemDTO);

    CartLineItemDTO update(CartLineItemDTO cartLineItemDTO);

    Optional<CartLineItemDTO> partialUpdate(CartLineItemDTO cartLineItemDTO);

    Page<CartLineItemDTO> findAll(Pageable pageable);

    Optional<CartLineItemDTO> findOne(Long id);

    Optional<CartLineItemDTO> findCartLineItemByCartIdAndAndProductId(Long cartId, Long productId);

    void delete (Long id);

    List<CartLineItemDTO> updateCartLineItems(List<CartLineItemDTO> cartLineItemDTOList, Long cartId);
}
