package com.narang.web.service;

import com.narang.web.entity.Product;
import com.narang.web.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }


    public Product findById(String id) {
        return productRepository.findById(id).orElseThrow();
    }

    public String insert(Product product) {
        Product newProduct = productRepository.insert(product);
        return newProduct.getId();
    }

    public Product update(Product product) {
        return productRepository.update(product);
    }

    public Boolean deleteById(String id) {
        productRepository.deleteById(id);
        return true;
    }
}
