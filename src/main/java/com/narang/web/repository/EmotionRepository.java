package com.narang.web.repository;

import com.narang.web.entity.Emotion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmotionRepository extends MongoRepository<Emotion, String>, EmotionRepositoryCustom {
}
