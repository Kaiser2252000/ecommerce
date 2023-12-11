package com.ecom.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ecom.domain.LineItem} entity.
 */
public class LineItemDTO implements Serializable {

    private Long id;

    @NotNull
    private Long productId;

    private String productName;

    @NotNull
    private Long orderId;

    private Double price;

    private Integer quantity;

    private Integer discount;

    private String imageUrl;

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

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LineItemDTO)) {
            return false;
        }

        LineItemDTO lineItemDTO = (LineItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lineItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LineItemDTO{" +
            "id=" + getId() +
            ", productId=" + getProductId() +
            ", orderId=" + getOrderId() +
            ", price=" + getPrice() +
            ", quantity=" + getQuantity() +
            ", discount=" + getDiscount() +
            ", imageUrl=" + getImageUrl() +
            "}";
    }
}
