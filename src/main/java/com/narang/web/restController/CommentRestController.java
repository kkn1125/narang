package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Comment;
import com.narang.web.entity.Diary;
import com.narang.web.repository.CommentRepository;
import com.narang.web.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class CommentRestController {
    private CommentService commentService;

    @Autowired
    CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/comments")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(commentService.findAll());
    }

    @GetMapping("/comment/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(commentService.findByDid(did));
    }

    @PostMapping("/comment")
    public String insert(Comment comment) {
        System.out.println(comment);
        return commentService.insert(comment);
    }

    @PutMapping("/comment")
    public Boolean update(Comment comment) {
        return commentService.update(comment);
    }

    @DeleteMapping("/comment/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        commentService.deleteById(id);
        return true;
    }

}
