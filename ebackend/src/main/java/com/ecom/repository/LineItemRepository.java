package com.ecom.repository;

import com.ecom.domain.LineItem;
import com.ecom.repository.custom.LineItemRepositoryCustom;
import com.ecom.service.dto.LineItemDTO;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LineItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LineItemRepository extends JpaRepository<LineItem, Long>, LineItemRepositoryCustom {
    List<LineItem> findAllByOrderId(Long id);
}
