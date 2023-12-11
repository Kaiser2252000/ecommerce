package com.ecom.repository;

import com.ecom.domain.Orders;
import com.ecom.repository.custom.OrdersRepositoryCustom;
import com.ecom.service.dto.OrdersDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Orders entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long>, OrdersRepositoryCustom {
}
