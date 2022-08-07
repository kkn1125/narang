package com.narang.web.repository;

import com.narang.web.entity.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public class DiaryRepositoryCustomImpl implements DiaryRepositoryCustom {
    private MongoTemplate diaryTemplate;

    @Autowired
    DiaryRepositoryCustomImpl(MongoTemplate diaryTemplate) {
        this.diaryTemplate = diaryTemplate;
    }

    @Override
    public Boolean updateToPart(Diary diary) {
        Diary foundDiary = diaryTemplate.findById(diary.getId(), Diary.class);
        foundDiary.replace(diary);
        diaryTemplate.save(foundDiary, "diary");
        return true;
    }
}
