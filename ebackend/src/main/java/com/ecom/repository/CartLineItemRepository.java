package com.ecom.repository;

import com.ecom.domain.CartLineItem;
import com.ecom.repository.custom.CartLineItemRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartLineItemRepository extends JpaRepository<CartLineItem, Long>, CartLineItemRepositoryCustom {
    Optional<CartLineItem> findCartLineItemByCartIdAndAndProductId(Long cartId, Long productId);
    void deleteAllByCartId(Long cartId);
}
