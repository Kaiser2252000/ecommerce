package com.ecom.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

public class CartLineItemDTO implements Serializable {

    private Long id;

    @NotNull
    private Long cartId;

    @NotNull
    private Long productId;

    private Integer quantity;

    private String productName;

    private String imageUrl;

    private Double price;

    private Integer discount;

    private Integer maxQuantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getMaxQuantity() {
        return maxQuantity;
    }

    public void setMaxQuantity(Integer maxQuantity) {
        this.maxQuantity = maxQuantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartLineItemDTO)) {
            return false;
        }

        CartLineItemDTO cartLineItemDTO = (CartLineItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cartLineItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "CartLineItemDTO{" +
            "id=" + id +
            ", productId=" + productId +
            ", productName='" + productName + '\'' +
            ", cartId=" + cartId +
            ", quantity=" + quantity +
            ", imageUrl='" + imageUrl + '\'' +
            ", price='" + price + '\'' +
            ", discount='" + discount + '\'' +
            ", maxQuantity='" + maxQuantity + '\'' +
            '}';
    }
}
