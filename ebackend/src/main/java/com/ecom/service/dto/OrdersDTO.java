package com.ecom.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecom.domain.Orders} entity.
 */
public class OrdersDTO implements Serializable {

    private Long id;

    private Long userId;

    private String userName;

    private LocalDate orderDate;

    private Double shipPrice;

    private String status;

    private String shipperName;

    private String shipperPhone;

    private String customerName;

    private String customerPhone;

    private String customerAddress;

    private List<LineItemDTO> lineItemDTOList;

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Double getShipPrice() {
        return shipPrice;
    }

    public void setShipPrice(Double shipPrice) {
        this.shipPrice = shipPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShipperName() {
        return shipperName;
    }

    public void setShipperName(String shipperName) {
        this.shipperName = shipperName;
    }

    public String getShipperPhone() {
        return shipperPhone;
    }

    public void setShipperPhone(String shipperPhone) {
        this.shipperPhone = shipperPhone;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public List<LineItemDTO> getLineItemDTOList() {
        return lineItemDTOList;
    }

    public void setLineItemDTOList(List<LineItemDTO> lineItemDTOList) {
        this.lineItemDTOList = lineItemDTOList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrdersDTO)) {
            return false;
        }

        OrdersDTO ordersDTO = (OrdersDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ordersDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrdersDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", shipPrice=" + getShipPrice() +
            ", status='" + getStatus() + "'" +
            ", shipperName='" + getShipperName() + "'" +
            ", shipperPhone='" + getShipperPhone() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", customerPhone='" + getCustomerPhone() + "'" +
            ", customerAddress='" + getCustomerAddress() + "'" +
            "}";
    }
}
