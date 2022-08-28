package com.narang.web.service;

import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    //    @Value("${dev.profileupload}")
    @Value("${prod.profileupload}")
    private String profileUploadPath;
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

    public List<User> findByNickNames(List<String> nickNames) {
        return userRepository.findByNickNames(nickNames);
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
        String token = securityService.createToken(email, exp);
        User user = findByEmail(email);
        if (user == null) {
            return null;
        }

        Boolean isCorrect = user.getPassword().equals(password);
        if (isCorrect) {
            return token;
        }

        return null;
    }

    public String join(User user) {
        User foundUser = userRepository.findByNickName(user.getNickName()).orElse(null);
        if (foundUser != null && foundUser.compareWithNickName(user.getNickName())) {
            System.out.println("유저 닉네임이 다른 유저의 닉네임과 중복됩니다.");
            return "null";
        }
        String hashPassword = securityService.passwordEncode(user.getPassword());
        user.setUserAuth("USER");
        user.setPassword(hashPassword);
        User joinedUser = userRepository.insert(user);
        return joinedUser.getId();
    }

    public Boolean signout(String token) {
        String expiredToken = null;
        if(token == null || token.equals("")) {
            System.out.println("토큰 값이 유효하지 않습니다. 잘못된 요청입니다.");
            return false;
        }
        try {
            expiredToken = securityService.logout(token);
        } catch (Exception e) {
            System.out.println("sign out");
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

    public Map<String, Object> fileUpload(MultipartFile multipartFile, String id, String hashName) {
        File targetFile = new File(profileUploadPath
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

    public Boolean removeProfileImageById(String id) {
        File file = new File(profileUploadPath + id);
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            for (File f : files) {
                if (f.delete()) {
                    System.out.println("파일을 성공적으로 삭제 했습니다.");
                } else {
                    System.out.println("없는 파일 입니다.");
                }
            }
        }
        userRepository.removeProfileImageById(id);
        return true;
    }

    public User update(User user) {
        return userRepository.update(user);
    }

    public Boolean deleteById(String id) {
        userRepository.deleteById(id);
        return true;
    }
}
