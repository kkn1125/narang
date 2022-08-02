package com.narang.web.restController;

import com.narang.web.entity.Product;
import com.narang.web.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductRestController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.size() > 0) {
            return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("상품이 없습니다!", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<?> getSingleProduct(@PathVariable("pid") String id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()) {
            return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("pid가 [" + id + "]인 상품이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/product")
    public ResponseEntity<?> createGoods(@RequestBody Product product) {
        try {
            product.setRegdate(new Date(System.currentTimeMillis())); // db에 현재 시간이 UTC로 찍힘
            productRepository.save(product);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/product/{pid}")
    public ResponseEntity<?> updateById(@PathVariable("pid") String id, @RequestBody Product product) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product productToSave = productOptional.get();
            productToSave.setCategory(product.getCategory() != null ? product.getCategory() : productToSave.getCategory());
            productToSave.setName(product.getName() != null ? product.getName() : productToSave.getName());
            productToSave.setPrice(product.getPrice() != null ? product.getPrice() : productToSave.getPrice());
            productToSave.setAmount(product.getAmount() != null ? product.getAmount() : productToSave.getAmount());
            productToSave.setContent(product.getContent() != null ? product.getContent() : productToSave.getContent());
            productToSave.setSeller(product.getSeller() != null ? product.getSeller() : productToSave.getSeller());
            productToSave.setIsSoldOut(product.getIsSoldOut() != null ? product.getIsSoldOut() : productToSave.getIsSoldOut());
            productToSave.setUpdates(new Date(System.currentTimeMillis()));
            productRepository.save(productToSave);
            return new ResponseEntity<>(productToSave, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("pid가 [" + id + "]인 상품이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/product/{pid}")
    public ResponseEntity<?> deleteById(@PathVariable("pid") String id) {
        try {
            productRepository.deleteById(id);
            // id 잘못 입력시에도 리턴 찍히는 것 다시 체크하기!
            return new ResponseEntity<>("pid [" + id + "]인 상품이 성공적으로 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}