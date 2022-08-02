package com.narang.web.repository;

import com.narang.web.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class CommentRepositoryCustomImpl implements CommentRepositoryCustom{
    @Autowired
    private MongoTemplate mongo;

    @Override
    public Comment insertComment(Comment comment) {
        return mongo.insert(comment);
    }
}
