package com.ecom.repository.custom.impl;

import com.ecom.domain.Product;
import com.ecom.domain.User;
import com.ecom.repository.custom.UserRepositoryCustom;
import com.ecom.service.dto.AdminUserDTO;
import com.ecom.service.dto.UserDTO;
import java.math.BigInteger;
import java.util.*;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Page<User> searchUsers(Pageable pageable, String search) {
        String sql = "SELECT u FROM User u WHERE 1=1 ";
        if (null != search) {
            sql += "AND (LOWER(u.login) LIKE LOWER (CONCAT('%',:search,'%')) OR LOWER(u.fullName) LIKE LOWER ( CONCAT('%',:search,'%')))";
        }
        Query query = entityManager.createQuery(sql);
        if (null != search) {
            query.setParameter("search", search);
        }
        List<User> list = query.getResultList();
        Long count = query.getResultList().stream().count();
        return new PageImpl<>(list, pageable, count);
    }
}
