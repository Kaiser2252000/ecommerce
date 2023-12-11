package com.ecom.service.impl;

import com.ecom.domain.Product;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;
import com.ecom.service.dto.AdminUserDTO;
import com.ecom.service.dto.ProductDTO;
import com.ecom.service.mapper.ProductMapper;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    public ProductDTO update(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    public Optional<ProductDTO> partialUpdate(ProductDTO productDTO) {
        log.debug("Request to partially update Product : {}", productDTO);

        return productRepository
            .findById(productDTO.getId())
            .map(existingProduct -> {
                productMapper.partialUpdate(existingProduct, productDTO);

                return existingProduct;
            })
            .map(productRepository::save)
            .map(productMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable).map(productMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id).map(productMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository
            .findById(id)
            .ifPresent(product -> {
                product.setStatus(false);
                log.debug("Deleted Product: {}", product);
            });
    }

    @Override
    public List<ProductDTO> searchProducts(String query, Long categoryId) {
        return productRepository.searchProducts(query, categoryId);
    }

    @Override
    public Page<ProductDTO> findAllProducts(Pageable pageable) {
        return productRepository.findAllProducts(pageable);
    }

    @Override
    public List<ProductDTO> findAllByCategoryId(Long categoryId) {
        return productMapper.toDto(productRepository.findAllByCategoryId(categoryId));
    }

    @Override
    public List<ProductDTO> findAllNoPageable() {
        return productRepository.findAllNoPageable();
    }
}
