package com.ecom.service.impl;

import com.ecom.domain.Category;
import com.ecom.repository.CategoryRepository;
import com.ecom.service.CategoryService;
import com.ecom.service.dto.CategoryDTO;
import com.ecom.service.mapper.CategoryMapper;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Category}.
 */
@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        log.debug("Request to save Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) {
        log.debug("Request to save Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    @Override
    public Optional<CategoryDTO> partialUpdate(CategoryDTO categoryDTO) {
        log.debug("Request to partially update Category : {}", categoryDTO);

        return categoryRepository
            .findById(categoryDTO.getId())
            .map(existingCategory -> {
                categoryMapper.partialUpdate(existingCategory, categoryDTO);

                return existingCategory;
            })
            .map(categoryRepository::save)
            .map(categoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        return categoryRepository.findAll(pageable).map(categoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CategoryDTO> findOne(Long id) {
        log.debug("Request to get Category : {}", id);
        return categoryRepository.findById(id).map(categoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.deleteById(id);
    }

    @Override
    public Page<CategoryDTO> searchCategories(Pageable pageable, String search) {
        return categoryRepository.searchCategories(pageable, search).map(categoryMapper::toDto);
    }

    @Override
    public List<CategoryDTO> findAllNoPageable() {
        List<Category> categories=categoryRepository.findAll();
        List<CategoryDTO> categoryDTOS = new LinkedList<>();
        categories.forEach(category -> {
            categoryDTOS.add(categoryMapper.toDto(category));
        });
        return categoryDTOS;
    }

    @Override
    public List<CategoryDTO> findAllNoPageableStatusTrue() {
        List<Category> categories=categoryRepository.findAllByStatusIsTrue();
        List<CategoryDTO> categoryDTOS = new LinkedList<>();
        categories.forEach(category -> {
            categoryDTOS.add(categoryMapper.toDto(category));
        });
        return categoryDTOS;
    }
}
