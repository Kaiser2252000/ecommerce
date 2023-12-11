package com.ecom.repository.custom.impl;

import com.ecom.domain.Category;
import com.ecom.domain.Orders;
import com.ecom.repository.custom.CategoryRepositoryCustom;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Page<Category> searchCategories(Pageable pageable, String search) {
        String sql = "SELECT c FROM Category c WHERE 1=1 ";
        if (null != search) {
            sql += "AND LOWER(STR(c.name)) LIKE LOWER (CONCAT('%',:search,'%'))";
        }
        Query query = entityManager.createQuery(sql);
        if (null != search) {
            query.setParameter("search", search);
        }
        List<Category> list = query.getResultList();
        Long count = query.getResultList().stream().count();
        return new PageImpl<>(list, pageable, count);
    }
}
