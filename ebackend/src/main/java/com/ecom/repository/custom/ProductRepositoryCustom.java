package com.ecom.repository.custom;

import com.ecom.domain.Product;
import com.ecom.service.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepositoryCustom {
    List<ProductDTO> searchProducts(String query, Long categoryId);
    Page<ProductDTO> findAllProducts(Pageable pageable);
    List<ProductDTO> findAllNoPageable();
}
