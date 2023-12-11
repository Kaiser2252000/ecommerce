package com.ecom.repository.custom;

import com.ecom.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryRepositoryCustom {
    Page<Category> searchCategories(Pageable pageable, String search);
}
