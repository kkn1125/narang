package com.narang.web.repository;

import com.narang.web.entity.Comment;
import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Optional;

public interface UserRepositoryCustom {
    public Optional<User> findByNickName(String nickName);

    public Optional<User> findByEmail(String email);

    public Boolean update(User user);
}
