package com.narang.web.repository;

import com.narang.web.entity.Emotion;

import java.util.Optional;

public interface EmotionRepositoryCustom {
    public Optional<Emotion> findByUid(String uid);

    public Optional<Emotion> findByDid(String did);

    public Boolean deleteByDid(String did);

    public Boolean deleteByUid(String uid);
}
