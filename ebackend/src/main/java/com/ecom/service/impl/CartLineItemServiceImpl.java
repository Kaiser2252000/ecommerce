package com.ecom.service.impl;

import com.ecom.domain.CartLineItem;
import com.ecom.repository.CartLineItemRepository;
import com.ecom.service.CartLineItemService;
import com.ecom.service.dto.CartLineItemDTO;
import com.ecom.service.mapper.CartLineItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class CartLineItemServiceImpl implements CartLineItemService {

    private final Logger log = LoggerFactory.getLogger(CartLineItemServiceImpl.class);

    private final CartLineItemRepository cartLineItemRepository;

    private final CartLineItemMapper cartLineItemMapper;

    public CartLineItemServiceImpl(CartLineItemRepository cartLineItemRepository, CartLineItemMapper cartLineItemMapper){
        this.cartLineItemRepository = cartLineItemRepository;
        this.cartLineItemMapper = cartLineItemMapper;
    }

    @Override
    public CartLineItemDTO save(CartLineItemDTO cartLineItemDTO) {
        log.debug("Request to save CartLineItem : {}", cartLineItemDTO);
        CartLineItem cartLineItem = cartLineItemMapper.toEntity(cartLineItemDTO);
        cartLineItem = cartLineItemRepository.save(cartLineItem);
        return cartLineItemMapper.toDto(cartLineItem);
    }

    @Override
    public CartLineItemDTO update(CartLineItemDTO cartLineItemDTO) {
        log.debug("Request to save CartLineItem : {}", cartLineItemDTO);
        CartLineItem cartLineItem = cartLineItemMapper.toEntity(cartLineItemDTO);
        cartLineItem = cartLineItemRepository.save(cartLineItem);
        return cartLineItemMapper.toDto(cartLineItem);
    }

    @Override
    public Optional<CartLineItemDTO> partialUpdate(CartLineItemDTO cartLineItemDTO) {
        log.debug("Request to partially update LineItem : {}", cartLineItemDTO);

        return cartLineItemRepository
            .findById(cartLineItemDTO.getId())
            .map(existingLineItem -> {
                cartLineItemMapper.partialUpdate(existingLineItem, cartLineItemDTO);

                return existingLineItem;
            })
            .map(cartLineItemRepository::save)
            .map(cartLineItemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CartLineItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CartLineItems");
        return cartLineItemRepository.findAll(pageable).map(cartLineItemMapper::toDto);
    }

    @Override
    public Optional<CartLineItemDTO> findOne(Long id) {
        log.debug("Request to get CartLineItem : {}", id);
        return cartLineItemRepository.findById(id).map(cartLineItemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CartLineItem : {}", id);
        cartLineItemRepository.deleteById(id);
    }

    @Override
    public Optional<CartLineItemDTO> findCartLineItemByCartIdAndAndProductId(Long cartId, Long productId) {
        return cartLineItemRepository.findCartLineItemByCartIdAndAndProductId(cartId, productId).map(cartLineItemMapper::toDto);
    }

    @Override
    public List<CartLineItemDTO> updateCartLineItems(List<CartLineItemDTO> cartLineItemDTOList, Long cartId) {
        List<CartLineItemDTO> oldList = cartLineItemRepository.findCartLineItemsByCartId(cartId);
//        oldList.stream().map(
//            oldLineItemDTO -> {
//                AtomicBoolean isContain = new AtomicBoolean(false);
//                cartLineItemDTOList.stream().map(
//                    newLineItemDTO -> {
//                        if (newLineItemDTO.getProductId() == oldLineItemDTO.getProductId()) {
//                            isContain.set(true);
//                        }
//                        return newLineItemDTO;
//                    });
//                if (!isContain.get()) {
//                    cartLineItemRepository.deleteById(oldLineItemDTO.getId());
//                }
//                return oldLineItemDTO;
//            }
//        );

//        cartLineItemDTOList.stream().map(
//            newLineItemDTO ->{
//                AtomicBoolean isContain = new AtomicBoolean(false);
//                AtomicReference<Long> oldId = null;
//                oldList.stream().map(
//                    oldLineItemDTO->{
//                        if (newLineItemDTO.getProductId() == oldLineItemDTO.getProductId()) {
//                            isContain.set(true);
//                            oldId.set(oldLineItemDTO.getId());
//                        }
//                        return oldLineItemDTO;
//                    });
//                if (isContain.get()) {
//                    newLineItemDTO.setId(oldId.get());
//                }
//                return newLineItemDTO;
//            }
//        );

        oldList.forEach(oldLineItemDTO -> {
                AtomicBoolean isContain = new AtomicBoolean(false);
                cartLineItemDTOList.forEach(
                    newLineItemDTO -> {
                        if (newLineItemDTO.getProductId() == oldLineItemDTO.getProductId()) {
                            isContain.set(true);
                        }
                    });
                if (!isContain.get()) {
                    cartLineItemRepository.deleteById(oldLineItemDTO.getId());
                }
            }
        );



        cartLineItemDTOList.forEach(newCartLineItemDTO -> {
            AtomicBoolean isContain = new AtomicBoolean(false);
            AtomicReference<Long> oldId = new AtomicReference<>(null);
            oldList.forEach(oldCartLineItemDTO->{
                if (newCartLineItemDTO.getProductId() == oldCartLineItemDTO.getProductId()) {
                    isContain.set(true);
                    oldId.set(oldCartLineItemDTO.getId());
                }
            });

            if (!isContain.get()) {
                cartLineItemRepository.save(cartLineItemMapper.toEntity(newCartLineItemDTO));
            }else {
                newCartLineItemDTO.setId(oldId.get());
                cartLineItemRepository.save(cartLineItemMapper.toEntity(newCartLineItemDTO));
            }
        });

        return cartLineItemDTOList;
    }
}
