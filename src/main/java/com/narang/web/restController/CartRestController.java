package com.narang.web.restController;

import com.narang.web.entity.Cart;
import com.narang.web.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CartRestController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/carts")
    public ResponseEntity<?> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();
        if (carts.size() > 0) {
            return new ResponseEntity<List<Cart>>(carts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("장바구니가 없습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/carts/{cid}")
    public ResponseEntity<?> getSingleCart(@PathVariable("cid") String id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            return new ResponseEntity<>(cartOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("cid가 [" + id + "]인 카트가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/cart")
    public ResponseEntity<?> createCart(@RequestBody Cart cart) {
        try {
            cartRepository.save(cart);
            return new ResponseEntity<Cart>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cart/{cid}")
    public ResponseEntity<?> updateCart(@PathVariable("cid") String id, @RequestBody Cart cart) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cartToSave = cartOptional.get();
            cartToSave.setAmount(cart.getAmount() != null ? cart.getAmount() : cartToSave.getAmount());
            cartToSave.setIsOrdered(cart.getIsOrdered() == true ? cart.getIsOrdered() : cartToSave.getIsOrdered());
            cartRepository.save(cartToSave);
            return new ResponseEntity<>(cartToSave, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("cid가 [" + id + "]인 카트가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/cart/{cid}")
    public ResponseEntity<?> deleteCart(@PathVariable("cid") String id) {
        try {
            cartRepository.deleteById(id);
            return new ResponseEntity<>("cart가 성공적으로 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
