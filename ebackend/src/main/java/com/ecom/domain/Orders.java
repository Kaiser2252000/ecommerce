package com.ecom.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ordersGen")
    @SequenceGenerator(name = "ordersGen", sequenceName = "orders_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "ship_price")
    private Double shipPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "shipper_name")
    private String shipperName;

    @Column(name = "shipper_phone")
    private String shipperPhone;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "customer_address")
    private String customerAddress;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Orders id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Orders userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getOrderDate() {
        return this.orderDate;
    }

    public Orders orderDate(LocalDate orderDate) {
        this.setOrderDate(orderDate);
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Double getShipPrice() {
        return this.shipPrice;
    }

    public Orders shipPrice(Double shipPrice) {
        this.setShipPrice(shipPrice);
        return this;
    }

    public void setShipPrice(Double shipPrice) {
        this.shipPrice = shipPrice;
    }

    public String getStatus() {
        return this.status;
    }

    public Orders status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShipperName() {
        return this.shipperName;
    }

    public Orders shipperName(String shipperName) {
        this.setShipperName(shipperName);
        return this;
    }

    public void setShipperName(String shipperName) {
        this.shipperName = shipperName;
    }

    public String getShipperPhone() {
        return this.shipperPhone;
    }

    public Orders shipperPhone(String shipperPhone) {
        this.setShipperPhone(shipperPhone);
        return this;
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Orders)) {
            return false;
        }
        return id != null && id.equals(((Orders) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Orders{" +
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
