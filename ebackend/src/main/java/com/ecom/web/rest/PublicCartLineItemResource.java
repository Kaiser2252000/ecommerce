package com.ecom.web.rest;

import com.ecom.domain.CartLineItem;
import com.ecom.repository.CartLineItemRepository;
import com.ecom.repository.LineItemRepository;
import com.ecom.service.CartLineItemService;
import com.ecom.service.LineItemService;
import com.ecom.service.dto.CartLineItemDTO;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PublicCartLineItemResource {

    private final Logger log = LoggerFactory.getLogger(PublicCartLineItemResource.class);

    private static final String ENTITY_NAME = "cartLineItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CartLineItemService cartLineItemService;

    private final CartLineItemRepository cartLineItemRepository;

    public PublicCartLineItemResource(CartLineItemService cartLineItemService, CartLineItemRepository cartLineItemRepository) {
        this.cartLineItemService = cartLineItemService;
        this.cartLineItemRepository = cartLineItemRepository;
    }

    @PostMapping("/cart-line-items")
    public ResponseEntity<CartLineItemDTO> createCartLineItem(@Valid @RequestBody CartLineItemDTO cartLineItemDTO) throws URISyntaxException{
        log.debug("REST request to save CartLineItem : {}", cartLineItemDTO);
        if (cartLineItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new cartLineItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CartLineItemDTO result = cartLineItemService.save(cartLineItemDTO);
        return ResponseEntity
            .created(new URI("/api/cart-line-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/cart-line-items/{id}")
    public ResponseEntity<CartLineItemDTO> updateCartLineItem(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CartLineItemDTO cartLineItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CartLineItem : {}, {}", id, cartLineItemDTO);
        if (cartLineItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cartLineItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cartLineItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CartLineItemDTO result = cartLineItemService.update(cartLineItemDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartLineItemDTO.getId().toString()))
            .body(result);
    }

    @PatchMapping(value = "/cart-line-items/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CartLineItemDTO> partialUpdateLineItem(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CartLineItemDTO cartLineItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CartLineItem partially : {}, {}", id, cartLineItemDTO);
        if (cartLineItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cartLineItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cartLineItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CartLineItemDTO> result = cartLineItemService.partialUpdate(cartLineItemDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartLineItemDTO.getId().toString())
        );
    }

    @GetMapping("/cart-line-items")
    public ResponseEntity<List<CartLineItemDTO>> getAllCartLineItems(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of CartLineItems");
        Page<CartLineItemDTO> page = cartLineItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/cart-line-items/{id}")
    public ResponseEntity<CartLineItemDTO> getCartLineItem(@PathVariable Long id) {
        log.debug("REST request to get CartLineItem : {}", id);
        Optional<CartLineItemDTO> cartLineItemDTO = cartLineItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cartLineItemDTO);
    }

    @DeleteMapping("/cart-line-items/{id}")
    public ResponseEntity<Void> deleteCartLineItem(@PathVariable Long id) {
        log.debug("REST request to delete CartLineItem : {}", id);
        cartLineItemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/cart-line-items/{cartId}/{productId}")
    public ResponseEntity<CartLineItemDTO> getCartLineItemByCartIdAndProductId(@PathVariable Long cartId, @PathVariable Long productId) {
        log.debug("REST request to get CartLineItem by CartId and ProductId : {}, {}", cartId,productId );
        Optional<CartLineItemDTO> cartLineItemDTO = cartLineItemService.findCartLineItemByCartIdAndAndProductId(cartId,productId);
        return ResponseUtil.wrapOrNotFound(cartLineItemDTO);
    }

    @PostMapping("/cart-line-items/{cartId}/update")
    public ResponseEntity<List<CartLineItemDTO>> updateCartLineItems(@Valid @RequestBody List<CartLineItemDTO> cartLineItemDTOList, @PathVariable String cartId) throws URISyntaxException{
        log.debug("REST request to save CartLineItems : {}", cartLineItemDTOList);
        List<CartLineItemDTO> result = cartLineItemService.updateCartLineItems(cartLineItemDTOList,Long.valueOf (cartId));
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartLineItemDTOList.toString()))
            .body(result);
    }
}
