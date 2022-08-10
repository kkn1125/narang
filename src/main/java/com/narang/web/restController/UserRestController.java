package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.User;
import com.narang.web.service.UserService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserRestController {

    @Autowired
    private UserService userService;

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        // properties 설정도 있지만 java 구문으로 해결하는 방법 채택 (보기 쉽게 하기 위함)
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/users")
    public String findAll() throws JsonProcessingException {
        return mapper(userService.findAll());
    }

    @GetMapping("/user/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(userService.findById(id));
    }

    @GetMapping("/user/nickname/{nickName}")
    public String findByNickName(@PathVariable("nickName") String nickName) throws JsonProcessingException {
        return mapper(userService.findByNickName(nickName));
    }

    @PostMapping("/user/nicknames")
    public String findByNickName(String[] userNickNames) throws JsonProcessingException {
        List<String> nickNames = Arrays.asList(userNickNames);
        if(nickNames.size() == 0) return mapper(new ArrayList<>());

        List<User> users = userService.findByNickNames(nickNames);
        return mapper(users);
    }

    @GetMapping("/user/email/{email}")
    public String findByEmail(@PathVariable("email") String email) throws JsonProcessingException {
        System.out.println(email);
        return mapper(userService.findByEmail(email));
    }

    @PostMapping("/user/face/signin")
    public String faceSignin(String email, String password) {
        return userService.faceSignin(email, password);
    }

    @PostMapping("/user/signin")
    public String signin(String email, String password) {
        return userService.signin(email, password);
    }

    @PostMapping("/token/confirm")
    public Map<String, Object> getSubject(String token) {
        return userService.confirmToken(token);
    }

    @PostMapping("/user/signout")
    public Boolean signout(String token) {
        return userService.signout(token);
    }

    @PostMapping("/user/checkPassword")
    public Boolean checkPassword(String password, String id) {
        return userService.checkPassword(password, id);
    }

    @PostMapping("/user")
    public String insert(User user) {
        return userService.join(user);
    }

    @PostMapping("/fileupload")
    public Map<String, Object> fileupload(MultipartFile multipartFile, String id, String hashName) {
        File targetFile = new File("src/main/frontend/src/upload/"
                + id
                + "/" + hashName);
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        Map<String, Object> m = new HashMap<>();
        return m;
    }

    @PostMapping("/profile/fileupload")
    public Map<String, Object> profileFileupload(MultipartFile multipartFile, String id, String hashName) {
        File targetFile = new File("src/main/frontend/src/profiles/"
                + id
                + "/" + hashName);
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        Map<String, Object> m = new HashMap<>();
        return m;
    }

    @PutMapping("/user")
    public String update(User user) throws JsonProcessingException {
        userService.update(user);
        return mapper(userService.findById(user.getId()));
    }

    @DeleteMapping("/user/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        return userService.deleteById(id);
    }

    @DeleteMapping("/user/profile/{id}")
    public Boolean removeUserProfile(@PathVariable("id") String id) {
        return userService.removeProfileImageById(id);
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