package com.ecom.service;

import com.ecom.service.dto.BillDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecom.domain.Bill}.
 */
public interface BillService {
    /**
     * Save a bill.
     *
     * @param billDTO the entity to save.
     * @return the persisted entity.
     */
    BillDTO save(BillDTO billDTO);

    /**
     * Updates a bill.
     *
     * @param billDTO the entity to update.
     * @return the persisted entity.
     */
    BillDTO update(BillDTO billDTO);

    /**
     * Partially updates a bill.
     *
     * @param billDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BillDTO> partialUpdate(BillDTO billDTO);

    /**
     * Get all the bills.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BillDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bill.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BillDTO> findOne(Long id);

    /**
     * Delete the "id" bill.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
