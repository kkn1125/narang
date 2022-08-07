package com.narang.web.repository;

import com.narang.web.entity.FaceImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FaceImageRepository extends MongoRepository<FaceImage, String>, FaceImageRepositoryCustom {
}
