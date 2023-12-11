package com.ecom.service;

import com.ecom.service.dto.CartDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface CartService {

    CartDTO save(CartDTO cartDTO);

    CartDTO update(CartDTO cartDTO);

    Optional<CartDTO> partialUpdate(CartDTO cartDTO);

    Page<CartDTO> findAll(Pageable pageable);

    Optional<CartDTO> findOne(Long id);

    Optional<CartDTO> findOneByUserId(Long id);

    void delete(Long id);

    Optional<CartDTO> findOneById(Long id);
}
