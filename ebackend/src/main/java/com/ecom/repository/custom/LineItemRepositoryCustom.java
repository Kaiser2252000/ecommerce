package com.ecom.repository.custom;

import com.ecom.domain.LineItem;
import com.ecom.service.dto.LineItemDTO;

import java.util.List;

public interface LineItemRepositoryCustom {
    List<LineItemDTO> findLineItemsByOrderId(Long id);
}
