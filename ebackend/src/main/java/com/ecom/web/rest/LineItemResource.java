package com.ecom.web.rest;

import com.ecom.repository.LineItemRepository;
import com.ecom.service.LineItemService;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ecom.domain.LineItem}.
 */
@RestController
@RequestMapping("/api")
public class LineItemResource {

    private final Logger log = LoggerFactory.getLogger(LineItemResource.class);

    private static final String ENTITY_NAME = "lineItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LineItemService lineItemService;

    private final LineItemRepository lineItemRepository;

    public LineItemResource(LineItemService lineItemService, LineItemRepository lineItemRepository) {
        this.lineItemService = lineItemService;
        this.lineItemRepository = lineItemRepository;
    }

    /**
     * {@code POST  /line-items} : Create a new lineItem.
     *
     * @param lineItemDTO the lineItemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lineItemDTO, or with status {@code 400 (Bad Request)} if the lineItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/line-items")
    public ResponseEntity<LineItemDTO> createLineItem(@Valid @RequestBody LineItemDTO lineItemDTO) throws URISyntaxException {
        log.debug("REST request to save LineItem : {}", lineItemDTO);
        if (lineItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new lineItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LineItemDTO result = lineItemService.save(lineItemDTO);
        return ResponseEntity
            .created(new URI("/api/line-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /line-items/:id} : Updates an existing lineItem.
     *
     * @param id the id of the lineItemDTO to save.
     * @param lineItemDTO the lineItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lineItemDTO,
     * or with status {@code 400 (Bad Request)} if the lineItemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lineItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/line-items/{id}")
    public ResponseEntity<LineItemDTO> updateLineItem(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LineItemDTO lineItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update LineItem : {}, {}", id, lineItemDTO);
        if (lineItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lineItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lineItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LineItemDTO result = lineItemService.update(lineItemDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lineItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /line-items/:id} : Partial updates given fields of an existing lineItem, field will ignore if it is null
     *
     * @param id the id of the lineItemDTO to save.
     * @param lineItemDTO the lineItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lineItemDTO,
     * or with status {@code 400 (Bad Request)} if the lineItemDTO is not valid,
     * or with status {@code 404 (Not Found)} if the lineItemDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lineItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/line-items/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LineItemDTO> partialUpdateLineItem(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LineItemDTO lineItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update LineItem partially : {}, {}", id, lineItemDTO);
        if (lineItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lineItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lineItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LineItemDTO> result = lineItemService.partialUpdate(lineItemDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lineItemDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /line-items} : get all the lineItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lineItems in body.
     */
    @GetMapping("/line-items")
    public ResponseEntity<List<LineItemDTO>> getAllLineItems(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of LineItems");
        Page<LineItemDTO> page = lineItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /line-items/:id} : get the "id" lineItem.
     *
     * @param id the id of the lineItemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lineItemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/line-items/{id}")
    public ResponseEntity<LineItemDTO> getLineItem(@PathVariable Long id) {
        log.debug("REST request to get LineItem : {}", id);
        Optional<LineItemDTO> lineItemDTO = lineItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lineItemDTO);
    }

    /**
     * {@code DELETE  /line-items/:id} : delete the "id" lineItem.
     *
     * @param id the id of the lineItemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/line-items/{id}")
    public ResponseEntity<Void> deleteLineItem(@PathVariable Long id) {
        log.debug("REST request to delete LineItem : {}", id);
        lineItemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
