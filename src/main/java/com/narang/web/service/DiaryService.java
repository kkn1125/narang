package com.narang.web.service;

import com.narang.web.entity.Diary;
import com.narang.web.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {
    private DiaryRepository diaryRepository;

    @Autowired
    DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public List<Diary> findAll() {
        return diaryRepository.findAll((Sort.by(Sort.Order.desc("regdate"))));
    }

    public Diary findById(String id) {
        Optional<Diary> options = diaryRepository.findById(id);
        if(options.isPresent()){
            return options.get();
        }
        return null;
    }

    public String insert(Diary diary) {
        Diary newDiary = diaryRepository.insert(diary);
        return newDiary.getId();
    }

    public Diary update(Diary diary){
        return diaryRepository.update(diary);
    }

    public Boolean deleteById(String id) {
        diaryRepository.deleteById(id);
        return true;
    }
}
