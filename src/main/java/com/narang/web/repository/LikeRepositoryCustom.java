package com.narang.web.repository;

import com.narang.web.entity.Like;

import java.util.Optional;

public interface LikeRepositoryCustom {
    public Optional<Like> findByUid(String uid);

    public Optional<Like> findByDid(String did);

    public Boolean deleteByUid(String uid);

    public Boolean deleteByDid(String did, String uid);
}
