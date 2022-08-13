package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Comment;
import com.narang.web.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CommentRestController {
    private CommentService commentService;

    @Autowired
    CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/comments")
    public String findAll() throws JsonProcessingException {
        return mapper(commentService.findAll());
    }

    @GetMapping("/comment/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        return mapper(commentService.findByDid(did));
    }

    @PostMapping("/comment")
    public String insert(Comment comment) {
        return commentService.insert(comment);
    }

    @PutMapping("/comment")
    public String update(Comment comment) throws JsonProcessingException {
        return mapper(commentService.update(comment));
    }

    @DeleteMapping("/comment/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        commentService.deleteById(id);
        return true;
    }
}
