package com.narang.web.repository;

import com.narang.web.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String>, CartRepositoryCustom {
}
