package com.ecom.service;

import com.ecom.service.dto.LineItemDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecom.domain.LineItem}.
 */
public interface LineItemService {
    /**
     * Save a lineItem.
     *
     * @param lineItemDTO the entity to save.
     * @return the persisted entity.
     */
    LineItemDTO save(LineItemDTO lineItemDTO);

    /**
     * Updates a lineItem.
     *
     * @param lineItemDTO the entity to update.
     * @return the persisted entity.
     */
    LineItemDTO update(LineItemDTO lineItemDTO);

    /**
     * Partially updates a lineItem.
     *
     * @param lineItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LineItemDTO> partialUpdate(LineItemDTO lineItemDTO);

    /**
     * Get all the lineItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LineItemDTO> findAll(Pageable pageable);

    /**
     * Get the "id" lineItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LineItemDTO> findOne(Long id);

    /**
     * Delete the "id" lineItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<LineItemDTO> findAllByOrderId(Long id);

    List<LineItemDTO> findLineItemsByOrderId(Long id);
}
