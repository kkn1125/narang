package com.narang.web.repository;

import com.narang.web.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String>, ProductRepositoryCustom {
}
