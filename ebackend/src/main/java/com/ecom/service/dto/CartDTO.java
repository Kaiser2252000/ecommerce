package com.ecom.service.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class CartDTO implements Serializable {

    private Long id;

    private Long userId;

    private List<CartLineItemDTO> cartLineItemDTOList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartLineItemDTO> getCartLineItemDTOList() {
        return cartLineItemDTOList;
    }

    public void setCartLineItemDTOList(List<CartLineItemDTO> cartLineItemDTOList) {
        this.cartLineItemDTOList = cartLineItemDTOList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartDTO)) {
            return false;
        }

        CartDTO cartDTO = (CartDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cartDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "CartDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", cartLineItemDTOList=" + getCartLineItemDTOList() +
            '}';
    }
}
