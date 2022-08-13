package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Cart;
import com.narang.web.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartRestController {
    private CartService cartService;

    @Autowired
    CartRestController(CartService cartService) {
        this.cartService = cartService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        // properties 설정도 있지만 java 구문으로 해결하는 방법 채택 (보기 쉽게 하기 위함)
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/carts")
    public String findAll() throws JsonProcessingException {
        return mapper(cartService.findAll());
    }

    @GetMapping("/cart/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(cartService.findById(id));
    }

    @PostMapping("/cart")
    public String insert(Cart cart) {
        return cartService.insert(cart);
    }

    @PutMapping("/cart")
    public String update(Cart cart) throws JsonProcessingException {
        return mapper(cartService.update(cart));
    }

    @DeleteMapping("/cart/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return cartService.deleteById(id);
    }
}
