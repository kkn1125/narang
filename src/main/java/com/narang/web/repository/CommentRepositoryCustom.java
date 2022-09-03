package com.narang.web.repository;

import com.narang.web.entity.Comment;

import java.util.List;

public interface CommentRepositoryCustom {
    public List<Comment> findByDid(String did);

    public Comment update(Comment comment);
    public Boolean deleteByDid (String did);
}
