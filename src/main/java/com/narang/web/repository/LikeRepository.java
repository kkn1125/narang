package com.narang.web.repository;

import com.narang.web.entity.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LikeRepository extends MongoRepository<Like, String>, LikeRepositoryCustom {
}
