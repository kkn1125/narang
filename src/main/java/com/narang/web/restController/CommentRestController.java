package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Comment;
import com.narang.web.entity.Diary;
import com.narang.web.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class CommentRestController {
    @Autowired
    private CommentRepository repository;

    @GetMapping("/comments")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(repository.findAll()));
        return mapper.writeValueAsString(repository.findAll());
    }

    @PostMapping("/comment")
    public String insert(Comment comment) {
        System.out.println(comment);
        Comment newComment = repository.insertComment(comment);
        return newComment.getId();
    }
    @PutMapping("/comment")
    public Boolean update(Comment comment) {
        repository.save(comment);
        return true;
    }

    @DeleteMapping("/comment/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        repository.deleteById(id);
        return true;
    }

}
