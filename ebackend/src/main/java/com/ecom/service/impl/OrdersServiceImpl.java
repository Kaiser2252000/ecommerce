package com.ecom.service.impl;

import com.ecom.domain.Cart;
import com.ecom.domain.CartLineItem;
import com.ecom.domain.Orders;
import com.ecom.domain.Product;
import com.ecom.repository.*;
import com.ecom.service.OrdersService;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.service.dto.OrdersDTO;
import com.ecom.service.dto.ProductDTO;
import com.ecom.service.mapper.LineItemMapper;
import com.ecom.service.mapper.OrdersMapper;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Orders}.
 */
@Service
@Transactional
public class OrdersServiceImpl implements OrdersService {

    private final Logger log = LoggerFactory.getLogger(OrdersServiceImpl.class);

    private final OrdersRepository ordersRepository;

    private final LineItemRepository lineItemRepository;

    private final OrdersMapper ordersMapper;

    private final LineItemMapper lineItemMapper;

    private final CartLineItemRepository cartLineItemRepository;

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    public OrdersServiceImpl(OrdersRepository ordersRepository, OrdersMapper ordersMapper, LineItemRepository lineItemRepository,LineItemMapper lineItemMapper,CartLineItemRepository cartLineItemRepository, CartRepository cartRepository, ProductRepository productRepository) {
        this.ordersRepository = ordersRepository;
        this.ordersMapper = ordersMapper;
        this.lineItemRepository = lineItemRepository;
        this.lineItemMapper = lineItemMapper;
        this.cartLineItemRepository = cartLineItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Override
    public OrdersDTO save(OrdersDTO ordersDTO) {
        log.debug("Request to save Orders : {}", ordersDTO);
        List<LineItemDTO> lineItemDTOList = ordersDTO.getLineItemDTOList();
        Orders orders = ordersMapper.toEntity(ordersDTO);
        orders = ordersRepository.save(orders);
        Long ordersId = orders.getId();
        lineItemDTOList.forEach(lineItemDTO -> {
            lineItemDTO.setOrderId(ordersId);
            lineItemRepository.save(lineItemMapper.toEntity(lineItemDTO));
            Product product = productRepository.findById(lineItemDTO.getProductId()).get();
            if (product.getQuantity()>0){
                product.setQuantity(product.getQuantity()-1);
            }
            productRepository.save(product);
        });
        Cart cart = cartRepository.findOneByUserId(orders.getUserId()).get();
        cartLineItemRepository.deleteAllByCartId(cart.getId());
        return ordersMapper.toDto(orders);
    }

    @Override
    public OrdersDTO update(OrdersDTO ordersDTO) {
        log.debug("Request to save Orders : {}", ordersDTO);
        Orders orders = ordersMapper.toEntity(ordersDTO);
        orders = ordersRepository.save(orders);
        return ordersMapper.toDto(orders);
    }

    @Override
    public Optional<OrdersDTO> partialUpdate(OrdersDTO ordersDTO) {
        log.debug("Request to partially update Orders : {}", ordersDTO);

        return ordersRepository
            .findById(ordersDTO.getId())
            .map(existingOrders -> {
                ordersMapper.partialUpdate(existingOrders, ordersDTO);

                return existingOrders;
            })
            .map(ordersRepository::save)
            .map(ordersMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrdersDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return ordersRepository.findAll(pageable).map(ordersMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrdersDTO> findOne(Long id) {
        log.debug("Request to get Orders : {}", id);
        return ordersRepository.findById(id).map(ordersMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Orders : {}", id);
        ordersRepository.deleteById(id);
    }

    @Override
    public Page<OrdersDTO> searchOrders(Pageable pageable, String search) {
        return ordersRepository.searchOrders(pageable, search).map(ordersMapper::toDto);
    }

    @Override
    public Optional<OrdersDTO> findOrdersById(Long id) {
        Optional<OrdersDTO> ordersDTO = ordersRepository.findOrderById(id);
        ordersDTO.get().setLineItemDTOList(lineItemRepository.findLineItemsByOrderId(id));
        return ordersDTO;
    }

    @Override
    public void updateStatus(Long id, String status) {
        ordersRepository.findById(id)
            .ifPresent(orders->{
            orders.setStatus(status);
            log.debug("Update Status: {}", orders);
        });
    }

    @Override
    public List<OrdersDTO> findAllByUserId(Long id, String status) {
        List<OrdersDTO> ordersDTOList = ordersRepository.findAllByUserId(id, status);
        ordersDTOList.forEach(ordersDTO -> {
            ordersDTO.setLineItemDTOList(lineItemRepository.findLineItemsByOrderId(ordersDTO.getId()));
        });
        return ordersDTOList;
    }

    @Override
    public void cancelOrder(Long id) {
        ordersRepository.findById(id)
            .ifPresent(orders->{
                orders.setStatus("Canceled");
                log.debug("Cancel Order: {}", orders);
            });
    }

    @Override
    public List<OrdersDTO> findAllNoPageable() {
        return ordersRepository.findAllNoPageable();
    }
}
