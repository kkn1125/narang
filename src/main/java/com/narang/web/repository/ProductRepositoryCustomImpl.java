package com.narang.web.repository;

import com.narang.web.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {
    private MongoTemplate productTemplate;

    @Autowired
    ProductRepositoryCustomImpl(MongoTemplate productTemplate) {
        this.productTemplate = productTemplate;
    }

    @Override
    public Product update(Product product) {
        Product foundProduct = productTemplate.findById(product.getId(), Product.class);
        foundProduct.replaceIfNotNull(product);
        return productTemplate.save(foundProduct, "products");
    }
}
