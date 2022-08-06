package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import com.narang.web.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserRestController {
    private final static long exp = 1000 * 60 * 60;
    @Autowired
    private SecurityService securityService;

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

    @GetMapping("/user/email/{email}")
    public String findByEmail(@PathVariable("email") String email) throws JsonProcessingException {
        System.out.println(email);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(userTemplate.findByEmail(email));
        return mapper.writeValueAsString(userTemplate.findByEmail(email).orElseThrow());
    }

    @PostMapping("/user/signin")
    public String signin(String email, String password
//            , HttpSession session
    ) {
        String token = securityService.createToken(email, exp);
        System.out.println("token: " + token);
        System.out.println("email: " + email);
        System.out.println("password: " + password);
        User user = userTemplate.findByEmail(email).orElseThrow();
        System.out.println(user);
        if (user == null) {
            return null;
        }

        Boolean isCorrect = securityService.matchPassword(password, user.getPassword());
        if (isCorrect) {
//            session.setAttribute("user", user.getId());
            System.out.println(isCorrect);
            System.out.println(user.getPassword());
//            System.out.println(session.getId());
            return token;
        }

        return null;
    }

    @PostMapping("/token/confirm")
    public Map<String, Object> getSubject(String token) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            String subject = securityService.getSubject(token);
            map.put("result", subject);
            return map;
        } catch (Exception ex) {
            map.put("result", false);
            return map;
        }
    }

//    @PostMapping("/user/refresh")
//    public Boolean refreshSession(HttpSession session) {
//        session.removeAttribute("user");
//        return true;
//    }

    @PostMapping("/user/signout")
    public Boolean signout(String token) {
//        System.out.println("세션 제거");
//        session.invalidate();
        String expiredToken = null;
        System.out.println("sign out");
        try {
            expiredToken = securityService.logout(token);
        } catch (Exception e) {
            return true;
        }
        return false;
    }

    @PostMapping("/user")
    public Boolean insert(User user, String authRole) {
        if (authRole == null) {
            authRole = "USER";
        }
        String hashPassword = securityService.passwordEncode(user.getPassword());
        user.setUserAuth(authRole);
        user.setPassword(hashPassword);

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

// [UnAuthorized error 날 때] https://subbak2.com/11
// [위와 마찬가지이지만 Stackoverflow] https://stackoverflow.com/questions/45232071/springboot-401-unauthorized-even-with-out-security
// [application.properties 변수 사용 방법 1] https://tecoble.techcourse.co.kr/post/2020-09-29-spring-properties-binding/
// [application.properties 변수 사용 방법 2] https://bcp0109.tistory.com/227
// [시크릿 키 생성 블로그] https://blossoming-man.tistory.com/entry/jwt-secret-key-%EB%A7%8C%EB%93%A4%EA%B8%B0
// [좋은 영상 강의 - jwt 사용방법] https://www.youtube.com/watch?v=TlWzEr4cXfc&t=1658s&ab_channel=%EC%84%B1%EC%A7%80%EC%B1%84%EB%84%90
// https://velog.io/@dsunni/Spring-Boot-React-JWT%EB%A1%9C-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// https://hjjooace.tistory.com/entry/React-Spring-Gradle-Project-%EC%97%B0%EB%8F%99#none
// https://ar-tec.tistory.com/68
// [정말 간단한 예제] https://github.com/hch0821/spring-security-and-react-integration
// [refresh token 예제?] https://github.com/ParkJiwoon/practice-codes/blob/master/spring-security-jwt/src/main/java/com/tutorial/jwtsecurity/service/AuthService.java
// [제일 어렵고 유익한 블로그] https://bcp0109.tistory.com/301
// [위의 어려운 걸 따라한 블로그] https://velog.io/@juno0713/Spring-Security-JWT-React-w3wpg5yi