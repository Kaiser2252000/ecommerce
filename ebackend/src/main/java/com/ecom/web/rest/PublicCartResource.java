package com.ecom.web.rest;


import com.ecom.repository.CartRepository;
import com.ecom.security.AuthoritiesConstants;
import com.ecom.service.CartService;
import com.ecom.service.dto.CartDTO;
import com.ecom.service.dto.OrdersDTO;
import com.ecom.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PublicCartResource {

    private final Logger log = LoggerFactory.getLogger(PublicCartResource.class);

    private static final String ENTITY_NAME = "cart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CartService cartService;

    private final CartRepository cartRepository;

    public PublicCartResource(CartService cartService, CartRepository cartRepository){
        this.cartService = cartService;
        this.cartRepository = cartRepository;
    }

    @PostMapping("/carts")
    public ResponseEntity<CartDTO> createCarts(@RequestBody CartDTO cartDTO) throws URISyntaxException {
        log.debug("REST request to save Carts : {}", cartDTO);
        if (cartDTO.getId() != null) {
            throw new BadRequestAlertException("A new orders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CartDTO result = cartService.save(cartDTO);
        return ResponseEntity
            .created(new URI("/api/carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/carts/{id}")
    public ResponseEntity<CartDTO> updateCarts(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CartDTO cartDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Carts : {}, {}", id, cartDTO);
        if (cartDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cartDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cartRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CartDTO result = cartService.update(cartDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartDTO.getId().toString()))
            .body(result);
    }

    @PatchMapping(value = "/carts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CartDTO> partialUpdateCarts(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CartDTO cartDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Carts partially : {}, {}", id, cartDTO);
        if (cartDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cartDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cartRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CartDTO> result = cartService.partialUpdate(cartDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartDTO.getId().toString())
        );
    }

    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getAllCarts(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Carts");
        Page<CartDTO> page = cartService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/carts/{id}")
    public ResponseEntity<CartDTO> getCarts(@PathVariable Long id) {
        log.debug("REST request to get Carts : {}", id);
//        Optional<OrdersDTO> ordersDTO = ordersService.findOne(id);
//        List<LineItemDTO> listLineItemDTOs = lineItemService.findAllByOrderId(id);
//        ordersDTO.get().setLineItemDTOList(listLineItemDTOs);
//        //        return ResponseUtil.wrapOrNotFound(objects);
        Optional <CartDTO> cartDTO = cartService.findOneById(id);
        return ResponseUtil.wrapOrNotFound(cartDTO);
    }

    @GetMapping("/carts/user-id/{userId}")
    public ResponseEntity<CartDTO> getCartsByUserId(@PathVariable Long userId) {
        log.debug("REST request to get Carts by UserId: {}", userId);
//        Optional<OrdersDTO> ordersDTO = ordersService.findOne(id);
//        List<LineItemDTO> listLineItemDTOs = lineItemService.findAllByOrderId(id);
//        ordersDTO.get().setLineItemDTOList(listLineItemDTOs);
//        //        return ResponseUtil.wrapOrNotFound(objects);
        Optional <CartDTO> cartDTO = cartService.findOneByUserId(userId);
        return ResponseUtil.wrapOrNotFound(cartDTO);
    }

    @DeleteMapping("/carts/{id}")
    public ResponseEntity<Void> deleteCarts(@PathVariable Long id) {
        log.debug("REST request to delete Carts : {}", id);
        cartService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }


}
