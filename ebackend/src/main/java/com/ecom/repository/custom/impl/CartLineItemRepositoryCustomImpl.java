package com.ecom.repository.custom.impl;

import com.ecom.repository.custom.CartLineItemRepositoryCustom;
import com.ecom.service.dto.CartLineItemDTO;
import com.ecom.service.dto.LineItemDTO;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.LinkedList;
import java.util.List;

public class CartLineItemRepositoryCustomImpl implements CartLineItemRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<CartLineItemDTO> findCartLineItemsByCartId(Long id) {
        String SQL = "SELECT cart_line_item.id, cart_line_item.product_id, product.name,cart_line_item.cart_id, cart_line_item.quantity, product.price, product.image_url, product.discount, product.quantity as maxQuantity FROM cart_line_item JOIN product ON cart_line_item.product_id = product.id WHERE cart_line_item.cart_id=:id";
        Query query = entityManager.createNativeQuery(SQL);
        if (null!=id){
            query.setParameter("id", id);
        }
        List<CartLineItemDTO> list = new LinkedList<>();
        List<Object[]> objects = query.getResultList();
        objects.forEach(o->{
            CartLineItemDTO cartLineItemDTO= new CartLineItemDTO();
            cartLineItemDTO.setId(Long.valueOf(String.valueOf(o[0])));
            cartLineItemDTO.setProductId(Long.valueOf(String.valueOf(o[1])));
            cartLineItemDTO.setProductName(String.valueOf(o[2]));
            cartLineItemDTO.setCartId(Long.valueOf(String.valueOf(o[3])));
            cartLineItemDTO.setQuantity(Integer.valueOf(String.valueOf( o[4])));
            cartLineItemDTO.setPrice((Double) (o[5]));
            cartLineItemDTO.setImageUrl(String.valueOf(o[6]));
            cartLineItemDTO.setDiscount((o[7]!=null)?Integer.valueOf(String.valueOf(o[7])):null);
            cartLineItemDTO.setMaxQuantity(Integer.valueOf(String.valueOf( o[8])));
            list.add(cartLineItemDTO);
        });

        return list;
    }
}
