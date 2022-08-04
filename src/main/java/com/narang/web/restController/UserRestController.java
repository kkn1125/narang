package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserRestController {
    @Autowired
    private UserRepository userTemplate;

    @GetMapping("/users")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(userTemplate.findAll());
        /* 객체를 JSON String 으로 변환 :: String */
    }

    @GetMapping("/user/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        System.out.println(id);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(userTemplate.findById(id));
        return mapper.writeValueAsString(userTemplate.findById(id));
    }


    @GetMapping("/user/nickname/{nickName}")
    public String findByNickName(@PathVariable("nickName") String nickName) throws JsonProcessingException {
        System.out.println(nickName);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(userTemplate.findByNickName(nickName));
        return mapper.writeValueAsString(userTemplate.findByNickName(nickName));
    }

    @PostMapping("/user/signin")
    public String signin(String email, String password, HttpSession session) {
        System.out.println(email);
        System.out.println(password);
        User user = userTemplate.findByEmail(email).orElseThrow();
        System.out.println(user);
        if (user == null) {
            return null;
        }

        Boolean isCorrect = user.compareWithPassword(password);
        System.out.println(isCorrect);
        if (isCorrect) {
            session.setAttribute("user", user.getId());
            System.out.println(isCorrect);
            System.out.println(session.getId());
            return session.getId();
        }

        return null;
    }

    @PostMapping("/user/refresh")
    public Boolean refreshSession(HttpSession session) {
        session.removeAttribute("user");
        return true;
    }
    @PostMapping("/user/signout")
    public Boolean signout(HttpSession session) {
        System.out.println("세션 제거");
        session.invalidate();
        return true;
    }

    @PostMapping("/user")
    public Boolean insert(User user) {
        System.out.println(user);
        userTemplate.insert(user);
        return true;
    }

    @PutMapping("/user")
    public Boolean update(User user) {
        System.out.println(user);
        userTemplate.save(user);
        return true;
    }

    @DeleteMapping("/user/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        System.out.println("called user insert method");
        userTemplate.deleteById(id);
        return true;
    }
}
