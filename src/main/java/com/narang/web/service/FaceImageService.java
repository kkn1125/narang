package com.narang.web.service;

import com.narang.web.entity.FaceImage;
import com.narang.web.repository.FaceImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaceImageService {
    FaceImageRepository faceRepository;

    @Autowired
    FaceImageService(FaceImageRepository faceRepository) {
        this.faceRepository = faceRepository;
    }

    public List<FaceImage> findAll(){
        return faceRepository.findAll();
    }

    public FaceImage findById(String id) {
        return faceRepository.findById(id).orElseThrow();
    }

    public FaceImage findByUid (String uid) {
        return faceRepository.findByUid(uid).orElseThrow();
    }

    public String insert(FaceImage face) {
        FaceImage newFace = faceRepository.insert(face);
        return newFace.getId();
    }

    public Boolean deleteById(String id) {
        faceRepository.deleteById(id);
        return true;
    }

    public Boolean deleteByUid(String uid) {
        faceRepository.deleteByUid(uid);
        return true;
    }

    public Boolean deleteByTwo(String uid, List<String> ids) {
        faceRepository.deleteByTwo(uid, ids);
        return true;
    }
}
