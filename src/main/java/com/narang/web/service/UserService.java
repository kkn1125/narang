package com.narang.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final static long exp = 1000 * 60 * 60;

    private UserRepository userRepository;
    private SecurityService securityService;

//    private String mapper(Object object) throws JsonProcessingException {
//        return new ObjectMapper().writeValueAsString(object);
//    }

    @Autowired
    UserService(UserRepository userRepository, SecurityService securityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public User findByNickName(String nickName) {
        return userRepository.findByNickName(nickName).orElseThrow();
    }

    public String signin(String email, String password) {
        String token = securityService.createToken(email, exp);
        System.out.println("token: " + token);
        System.out.println("email: " + email);
        System.out.println("password: " + password);
        User user = findByEmail(email);
        System.out.println(user);
        if (user == null) {
            return null;
        }

        Boolean isCorrect = securityService.matchPassword(password, user.getPassword());
        if (isCorrect) {
            System.out.println(isCorrect);
            System.out.println(user.getPassword());
            return token;
        }

        return null;
    }

    public String faceSignin(String email, String password) {
        User user = findByEmail(email);
        Boolean isMatched = user.compareWithPassword(password);
        if (isMatched) {
            String token = securityService.createToken(email, exp);
            return token;
        }
        return null;
    }

    public User join(User user) {
        String hashPassword = securityService.passwordEncode(user.getPassword());
        user.setUserAuth("USER");
        user.setPassword(hashPassword);
        User joinedUser = userRepository.insert(user);
        return joinedUser;
    }

    public Boolean signout(String token) {
        String expiredToken = null;
        System.out.println("sign out");
        try {
            expiredToken = securityService.logout(token);
        } catch (Exception e) {
            return true;
        }
        return false;
    }

    public Map<String, Object> confirmToken(String token) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            String subject = securityService.getSubject(token);
            map.put("result", subject);
        } catch (Exception ex) {
            map.put("result", false);
        } finally {
            return map;
        }
    }

    public Boolean checkPassword(String password, String id) {
        User user;
        try {
            user = findById(id);
            return securityService.matchPassword(password, user.getPassword());
        } catch (Exception ex) {
            System.out.println("일치하는 회원이 없습니다.");
            return false;
        }
    }

    public Boolean update(User user) {
        return userRepository.update(user);
    }

    public Boolean deleteById(String id) {
        userRepository.deleteById(id);
        return true;
    }
}
