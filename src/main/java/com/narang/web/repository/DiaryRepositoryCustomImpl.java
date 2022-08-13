package com.narang.web.repository;

import com.narang.web.entity.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class DiaryRepositoryCustomImpl implements DiaryRepositoryCustom {
    private MongoTemplate diaryTemplate;

    @Autowired
    DiaryRepositoryCustomImpl(MongoTemplate diaryTemplate) {
        this.diaryTemplate = diaryTemplate;
    }

    @Override
    public Diary update(Diary diary) {
        Diary foundDiary = diaryTemplate.findById(diary.getId(), Diary.class);
        foundDiary.replaceIfNotNull(diary);
        return diaryTemplate.save(foundDiary, "diary");
    }
}
