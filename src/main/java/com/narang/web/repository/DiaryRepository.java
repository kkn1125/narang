package com.narang.web.repository;

import com.narang.web.entity.Diary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface DiaryRepository extends MongoRepository<Diary, String>, DiaryRepositoryCustom {
}
