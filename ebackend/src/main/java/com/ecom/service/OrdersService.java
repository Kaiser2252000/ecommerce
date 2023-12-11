package com.ecom.service;

import com.ecom.service.dto.OrdersDTO;
import com.ecom.service.dto.ProductDTO;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecom.domain.Orders}.
 */
public interface OrdersService {
    /**
     * Save a orders.
     *
     * @param ordersDTO the entity to save.
     * @return the persisted entity.
     */
    OrdersDTO save(OrdersDTO ordersDTO);

    /**
     * Updates a orders.
     *
     * @param ordersDTO the entity to update.
     * @return the persisted entity.
     */
    OrdersDTO update(OrdersDTO ordersDTO);

    /**
     * Partially updates a orders.
     *
     * @param ordersDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrdersDTO> partialUpdate(OrdersDTO ordersDTO);

    /**
     * Get all the orders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrdersDTO> findAll(Pageable pageable);

    /**
     * Get the "id" orders.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrdersDTO> findOne(Long id);

    /**
     * Delete the "id" orders.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    void updateStatus(Long id, String status);

    void cancelOrder(Long id);

    Page<OrdersDTO> searchOrders(Pageable pageable, String search);

    Optional<OrdersDTO> findOrdersById(Long id);

    List<OrdersDTO> findAllByUserId(Long id, String status);

    List<OrdersDTO> findAllNoPageable();
}
