package com.narang.web.repository;

import com.narang.web.entity.Comment;
import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    public Optional<User> findByNickName(String nickName);
    public List<User> findByNickNames(List<String> nickNames);

    public Optional<User> findByEmail(String email);

    public User update(User user);

    public User removeProfileImageById(String id);
}
