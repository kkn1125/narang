package com.narang.web.service;

import com.narang.web.entity.Comment;
import com.narang.web.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private CommentRepository commentRepository;

    @Autowired
    CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public List<Comment> findByDid(String did) {
        return commentRepository.findByDid(did);
    }

    public Comment findById(String id) {
        return commentRepository.findById(id).orElseThrow();
    }

    public String insert(Comment comment) {
        Comment newComment = commentRepository.insert(comment);
        return newComment.getId();
    }

    public Comment update(Comment comment) {
        return commentRepository.update(comment);
    }

    public Boolean deleteById(String id) {
        commentRepository.deleteById(id);
        return true;
    }
}
