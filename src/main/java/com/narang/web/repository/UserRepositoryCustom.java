package com.narang.web.repository;

import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public interface UserRepositoryCustom {
    public void findQuery(String query);
}
