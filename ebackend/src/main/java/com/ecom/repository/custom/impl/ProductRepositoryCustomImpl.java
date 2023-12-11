package com.ecom.repository.custom.impl;

import com.ecom.domain.Product;
import com.ecom.domain.User;
import com.ecom.repository.custom.ProductRepositoryCustom;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.service.dto.ProductDTO;
import com.ecom.service.mapper.ProductMapper;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<ProductDTO> searchProducts(String query, Long categoryId) {
        String SQL = "SELECT product.id, product.name as productName, product.price, product.quantity, product.image_url,product.category_id, category.name as categoryName FROM product JOIN category ON product.category_id = category.id WHERE (LOWER (product.name) LIKE LOWER(CONCAT('%',:query,'%')) OR LOWER(product.brand) LIKE LOWER(CONCAT('%',:query,'%'))) ";
        if (null!=categoryId){
            SQL+="AND category.id=:categoryId";
        }
        Query nativeQuery = entityManager.createNativeQuery(SQL);
        nativeQuery.setParameter("query", query);
        if (null!=categoryId){
            nativeQuery.setParameter("categoryId", categoryId);
        }
        List<ProductDTO> list = new LinkedList<>();
        List<Object[]> objects = nativeQuery.getResultList();
        objects.forEach(o->{
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(Long.valueOf(String.valueOf(o[0])));
            productDTO.setName((String.valueOf(o[1])));
            productDTO.setPrice(Double.valueOf(String.valueOf(o[2])));
            productDTO.setQuantity(Integer.valueOf(String.valueOf(o[3])));
            productDTO.setImageUrl(String.valueOf(o[4]));
            productDTO.setCategoryId(Long.valueOf(String.valueOf(o[5])));
            productDTO.setCategoryName(String.valueOf(o[6]));
            list.add(productDTO);
        });

        return list;
    }

    @Override
    public Page<ProductDTO> findAllProducts(Pageable pageable) {
        String SQL = "SELECT product.id, product.name as productName, product.price, product.quantity, product.image_url,product.category_id, category.name as categoryName FROM product JOIN category ON product.category_id = category.id";
        Query query = entityManager.createNativeQuery(SQL);
        List<ProductDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(Long.valueOf(String.valueOf(o[0])));
            productDTO.setName((String.valueOf(o[1])));
            productDTO.setPrice(Double.valueOf(String.valueOf(o[2])));
            productDTO.setQuantity(Integer.valueOf(String.valueOf(o[3])));
            productDTO.setImageUrl(String.valueOf(o[4]));
            productDTO.setCategoryId(Long.valueOf(String.valueOf(o[5])));
            productDTO.setCategoryName(String.valueOf(o[6]));
            list.add(productDTO);
        });

        return new PageImpl<>(list, pageable, list.stream().count());
    }

    @Override
    public List<ProductDTO> findAllNoPageable() {
        String SQL = "SELECT product.id, product.name as productName, product.price, product.quantity, product.image_url,product.category_id, category.name as categoryName FROM product JOIN category ON product.category_id = category.id";
        Query query = entityManager.createNativeQuery(SQL);
        List<ProductDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(Long.valueOf(String.valueOf(o[0])));
            productDTO.setName((String.valueOf(o[1])));
            productDTO.setPrice(Double.valueOf(String.valueOf(o[2])));
            productDTO.setQuantity(Integer.valueOf(String.valueOf(o[3])));
            productDTO.setImageUrl(String.valueOf(o[4]));
            productDTO.setCategoryId(Long.valueOf(String.valueOf(o[5])));
            productDTO.setCategoryName(String.valueOf(o[6]));
            list.add(productDTO);
        });

        return list;
    }
}
