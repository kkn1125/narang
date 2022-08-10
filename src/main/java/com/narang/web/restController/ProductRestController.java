package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Product;
import com.narang.web.repository.ProductRepository;
import com.narang.web.service.ProductService;
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
    private ProductService productService;

    @Autowired
    ProductRestController(ProductService productService) {
        this.productService = productService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/products")
    public String findAll() throws JsonProcessingException {
        return mapper(productService.findAll());
    }

    @GetMapping("/product/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(productService.findById(id));
    }

    @PostMapping("/product")
    public String insert(Product product) {
        return productService.insert(product);
    }

    @PutMapping("/product")
    public String update(Product product) throws JsonProcessingException {
        return mapper(productService.update(product));
    }

    @DeleteMapping("/product/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return productService.deleteById(id);
    }
}
