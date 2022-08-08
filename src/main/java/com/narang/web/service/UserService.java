package com.narang.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.File;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final static long exp = 1000 * 60 * 60;

    private UserRepository userRepository;
    private SecurityService securityService;

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
        User user = findByEmail(email);
        if (user == null) {
            return null;
        }

        Boolean isCorrect = securityService.matchPassword(password, user.getPassword());
        if (isCorrect) {
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

    public String join(User user) {
        String hashPassword = securityService.passwordEncode(user.getPassword());
        user.setUserAuth("USER");
        user.setPassword(hashPassword);
        User joinedUser = userRepository.insert(user);
        return joinedUser.getId();
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

    public Boolean removeProfileImageById(String id) {
        File file = new File("src/main/frontend/src/profiles/"+id);
        if(file.isDirectory()) {
            File[] files = file.listFiles();
            for(File f : files) {
                if(f.delete()) {
                    System.out.println("파일을 성공적으로 삭제 했습니다.");
                } else {
                    System.out.println("없는 파일 입니다.");
                }
            }
        }
        userRepository.removeProfileImageById(id);
        return true;
    }

    public Boolean update(User user) {
        return userRepository.update(user);
    }

    public Boolean deleteById(String id) {
        userRepository.deleteById(id);
        return true;
    }
}
