package com.ecom.service.impl;

import com.ecom.domain.Cart;
import com.ecom.domain.Orders;
import com.ecom.repository.CartLineItemRepository;
import com.ecom.repository.CartRepository;
import com.ecom.service.CartService;
import com.ecom.service.dto.CartDTO;
import com.ecom.service.dto.OrdersDTO;
import com.ecom.service.mapper.CartMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final Logger log = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;

    private final CartMapper cartMapper;

    private final CartLineItemRepository cartLineItemRepository;

    public CartServiceImpl(CartRepository cartRepository, CartMapper cartMapper, CartLineItemRepository cartLineItemRepository){
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.cartLineItemRepository = cartLineItemRepository;
    }

    @Override
    public CartDTO save(CartDTO cartDTO) {
        log.debug("Request to save Cart : {}", cartDTO);
        Cart cart = cartMapper.toEntity(cartDTO);
        cart = cartRepository.save(cart);
        return cartMapper.toDto(cart);
    }

    @Override
    public CartDTO update(CartDTO cartDTO) {
        log.debug("Request to save Cart : {}", cartDTO);
        Cart cart = cartMapper.toEntity(cartDTO);
        cart = cartRepository.save(cart);
        return cartMapper.toDto(cart);
    }

    @Override
    public Optional<CartDTO> partialUpdate(CartDTO cartDTO) {
        log.debug("Request to partially update Cart : {}", cartDTO);

        return cartRepository
            .findById(cartDTO.getId())
            .map(existingOrders -> {
                cartMapper.partialUpdate(existingOrders, cartDTO);

                return existingOrders;
            })
            .map(cartRepository::save)
            .map(cartMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CartDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cart");
        return cartRepository.findAll(pageable).map(cartMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CartDTO> findOne(Long id) {
        log.debug("Request to get Cart : {}", id);
        return cartRepository.findById(id).map(cartMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cart : {}", id);
        cartRepository.deleteById(id);
    }

    @Override
    public Optional<CartDTO> findOneByUserId(Long id) {
        log.debug("Request to get Cart by User Id: {}", id);
        Optional<CartDTO> cartDTO =  cartRepository.findOneByUserId(id).map(cartMapper::toDto);
        cartDTO.get().setCartLineItemDTOList(cartLineItemRepository.findCartLineItemsByCartId(cartDTO.get().getId()));
        return cartDTO;
    }

    @Override
    public Optional<CartDTO> findOneById(Long id) {
        Optional<CartDTO> cartDTO = cartRepository.findById(id).map(cartMapper::toDto);
        cartDTO.get().setCartLineItemDTOList(cartLineItemRepository.findCartLineItemsByCartId(id));
        return cartDTO;
    }
}
