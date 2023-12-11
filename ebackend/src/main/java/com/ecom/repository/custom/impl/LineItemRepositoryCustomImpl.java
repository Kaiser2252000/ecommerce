package com.ecom.repository.custom.impl;

import com.ecom.repository.custom.LineItemRepositoryCustom;
import com.ecom.service.dto.LineItemDTO;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.Query;
import javax.sound.sampled.Line;


public class LineItemRepositoryCustomImpl implements LineItemRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<LineItemDTO> findLineItemsByOrderId(Long id) {
        String SQL = "SELECT line_item.id, line_item.product_id, product.name, order_id, line_item.price, line_item.quantity, line_item.discount, product.image_url FROM line_item JOIN product ON line_item.product_id = product.id WHERE line_item.order_id=:id";
        Query query = entityManager.createNativeQuery(SQL);
        if (null!=id){
            query.setParameter("id", id);
        }
        List<LineItemDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            LineItemDTO lineItemDTO = new LineItemDTO();
            lineItemDTO.setId(Long.valueOf(String.valueOf(o[0])));
            lineItemDTO.setProductId(Long.valueOf(String.valueOf(o[1])));
            lineItemDTO.setProductName(String.valueOf(o[2]));
            lineItemDTO.setOrderId(Long.valueOf(String.valueOf(o[3])));
            lineItemDTO.setPrice((Double) o[4]);
            lineItemDTO.setQuantity(Integer.valueOf(String.valueOf(o[5])));
            lineItemDTO.setDiscount((o[6]!=null)?Integer.valueOf(String.valueOf(o[6])):null);
            lineItemDTO.setImageUrl(String.valueOf(o[7]));
            list.add(lineItemDTO);
        });

        return list;
    }
}
