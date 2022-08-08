package com.narang.web.repository;

import com.narang.web.entity.Like;

import java.util.List;
import java.util.Optional;

public interface LikeRepositoryCustom {
    public Optional<Like> findByUid(String uid);

    public List<Like> findByDid(String did);

    public Boolean deleteByUid(String uid);

    public Boolean deleteByDid(String did, String uid);
}
