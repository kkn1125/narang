package com.narang.web.repository;

import com.narang.web.entity.FaceImage;

import java.util.List;

public interface FaceImageRepositoryCustom {
    List<FaceImage> findByUid(String uid);

    public Boolean deleteByUid(String uid);

    public Boolean deleteByTwo(String uid, List<String> ids);
}
