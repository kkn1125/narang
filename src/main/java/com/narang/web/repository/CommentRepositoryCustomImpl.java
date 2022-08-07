package com.narang.web.repository;

import com.narang.web.entity.Comment;
import com.narang.web.entity.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class CommentRepositoryCustomImpl implements CommentRepositoryCustom {
    @Autowired
    private MongoTemplate commentTemplate;

    @Override
    public List<Comment> findByDid(String did) {
        Criteria cr = new Criteria("did").is(did);
        Query q = new Query(cr);
        return commentTemplate.find(q, Comment.class);
    }

    @Override
    public Boolean updateToPart(Comment comment) {
        Comment foundComment = commentTemplate.findById(comment.getId(), Comment.class);
        foundComment.replace(comment);
        commentTemplate.save(foundComment, "comment");
        return true;
    }
}
