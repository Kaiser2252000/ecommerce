package com.ecom.service.mapper;

import com.ecom.domain.LineItem;
import com.ecom.service.dto.LineItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LineItem} and its DTO {@link LineItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface LineItemMapper extends EntityMapper<LineItemDTO, LineItem> {}
