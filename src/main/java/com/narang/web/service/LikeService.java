package com.narang.web.service;

import com.narang.web.entity.Like;
import com.narang.web.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    private LikeRepository likeRepository;

    @Autowired
    LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public List<Like> findAll() {
        return likeRepository.findAll();
    }

    public Like findById(String id) {
        return likeRepository.findById(id).orElseThrow();
    }

    public Like findByUid(String uid) {
        return likeRepository.findByUid(uid).orElseThrow();
    }

    public List<Like> findByDid(String did) {
        return likeRepository.findByDid(did);
    }

    public String insert(Like like){
        Like newLike = likeRepository.insert(like);
        return like.getId();
    }

    public Boolean deleteById(String id) {
        likeRepository.deleteById(id);
        return true;
    }

    public Boolean deleteByDid(String did, String uid) {
        return likeRepository.deleteByDid(did, uid);
    }

    public Boolean deleteByUid(String uid) {
        return likeRepository.deleteByUid(uid);
    }
}
