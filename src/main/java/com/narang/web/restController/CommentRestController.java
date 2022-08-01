package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Comment;
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

    @RequestMapping(path = "/comment", method = {RequestMethod.POST, RequestMethod.PUT})
    public Boolean insert(Comment comment, HttpServletRequest request) {
        System.out.println(comment);
        repository.save(comment);
        return true;
    }

    @DeleteMapping("/comment/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        repository.deleteById(id);
        return true;
    }

}
