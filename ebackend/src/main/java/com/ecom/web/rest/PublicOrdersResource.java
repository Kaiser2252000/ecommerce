package com.ecom.web.rest;

import com.ecom.repository.OrdersRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.security.AuthoritiesConstants;
import com.ecom.service.LineItemService;
import com.ecom.service.OrdersService;
import com.ecom.service.ProductService;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.service.dto.OrdersDTO;
import com.ecom.service.dto.ProductDTO;
import com.ecom.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ecom.domain.Orders}.
 */
@RestController
@RequestMapping("/api")
public class PublicOrdersResource {

    private final Logger log = LoggerFactory.getLogger(OrdersResource.class);

    private static final String ENTITY_NAME = "orders";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdersService ordersService;

    private final OrdersRepository ordersRepository;

    private final LineItemService lineItemService;

    private final ProductService productService;

    public PublicOrdersResource(
        OrdersService ordersService,
        OrdersRepository ordersRepository,
        LineItemService lineItemService,
        ProductService productService
    ) {
        this.ordersService = ordersService;
        this.ordersRepository = ordersRepository;
        this.lineItemService = lineItemService;
        this.productService = productService;
    }

    /**
     * {@code POST  /orders} : Create a new orders.
     *
     * @param ordersDTO the ordersDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordersDTO, or with status {@code 400 (Bad Request)} if the orders has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orders")
    public ResponseEntity<OrdersDTO> createOrders(@RequestBody OrdersDTO ordersDTO) throws URISyntaxException {
        log.debug("REST request to save Orders : {}", ordersDTO);
        if (ordersDTO.getId() != null) {
            throw new BadRequestAlertException("A new orders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdersDTO result = ordersService.save(ordersDTO);
        return ResponseEntity
            .created(new URI("/api/orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orders} : get all the orders.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orders in body.
     */
    @GetMapping("/orders")
    public ResponseEntity<List<OrdersDTO>> getAllOrders(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Orders");
        Page<OrdersDTO> page = ordersService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /orders/:id} : get the "id" orders.
     *
     * @param id the id of the ordersDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordersDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orders/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<OrdersDTO> getOrders(@PathVariable Long id) {
        log.debug("REST request to get Orders : {}", id);
//        Optional<OrdersDTO> ordersDTO = ordersService.findOne(id);
//        List<LineItemDTO> listLineItemDTOs = lineItemService.findAllByOrderId(id);
//        ordersDTO.get().setLineItemDTOList(listLineItemDTOs);
//        //        return ResponseUtil.wrapOrNotFound(objects);
        Optional <OrdersDTO> ordersDTO = ordersService.findOrdersById(id);
        return ResponseUtil.wrapOrNotFound(ordersDTO);
    }



    @PostMapping("/orders/search")
    public ResponseEntity<List<OrdersDTO>> searchOrders(
        @RequestParam(value = "search", required = false) String search,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Orders");
        Page<OrdersDTO> page = ordersService.searchOrders(pageable, search);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/orders/userId")
    public ResponseEntity<List<OrdersDTO>> getAllByUserId(
        @RequestParam(name = "userId") Long userId, @RequestParam(required = false, name = "orderStatus") String orderStatus
    ){
        log.debug("REST request to get all Orders by UserId");
        List<OrdersDTO> ordersDTOS = ordersService.findAllByUserId(userId, orderStatus);
        return new ResponseEntity<>(ordersDTOS, HttpStatus.OK);
    }

    @PostMapping("/orders/cancel/{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId) {
        log.debug("REST request to cancel Orders : {}", orderId);
        ordersService.cancelOrder(orderId);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, orderId.toString()))
            .build();
    }
}
