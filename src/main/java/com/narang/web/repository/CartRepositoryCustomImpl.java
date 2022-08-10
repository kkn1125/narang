package com.narang.web.repository;

import com.narang.web.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class CartRepositoryCustomImpl implements CartRepositoryCustom {
    private MongoTemplate cartTemplate;

    @Autowired
    CartRepositoryCustomImpl(MongoTemplate cartTemplate) {
        this.cartTemplate = cartTemplate;
    }

    @Override
    public Cart update(Cart cart) {
        Cart foundCart = cartTemplate.findById(cart.getId(), Cart.class);
        foundCart.replaceIfNotNull(cart);
        return cartTemplate.save(foundCart, "cart");
    }
}
