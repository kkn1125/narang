package com.narang.web.mongoTemplate;

import java.util.List;

public interface CrudTemplate<T> {
    List<T> findAll();

    T findById(String id);

    void insert(T t);

    void update(T t);

    void delete(String id);
}
