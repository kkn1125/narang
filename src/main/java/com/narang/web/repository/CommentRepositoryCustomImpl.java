package com.narang.web.repository;

import com.narang.web.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class CommentRepositoryCustomImpl implements CommentRepositoryCustom {
    private MongoTemplate commentTemplate;

    @Autowired
    CommentRepositoryCustomImpl(MongoTemplate commentTemplate) {
        this.commentTemplate = commentTemplate;
    }

    @Override
    public List<Comment> findByDid(String did) {
        Criteria cr = new Criteria("did").is(did);
        Query q = new Query(cr);
        return commentTemplate.find(q, Comment.class);
    }

    @Override
    public Comment update(Comment comment) {
        Comment foundComment = commentTemplate.findById(comment.getId(), Comment.class);
        foundComment.replaceIfNotNull(comment);
        return commentTemplate.save(foundComment, "comment");
    }
}
