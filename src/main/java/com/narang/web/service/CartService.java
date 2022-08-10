package com.narang.web.service;

import com.narang.web.entity.Cart;
import com.narang.web.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private CartRepository cartRepository;

    @Autowired
    CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    public Cart findById(String id) {
        return cartRepository.findById(id).orElseThrow();
    }

    public String insert(Cart cart) {
        Cart newCart = cartRepository.insert(cart);
        return newCart.getId();
    }

    public Cart update(Cart cart) {
        return cartRepository.update(cart);
    }

    public Boolean deleteById(String id) {
        cartRepository.deleteById(id);
        return true;
    }
}
