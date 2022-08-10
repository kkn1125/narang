package com.narang.web.repository;

import com.narang.web.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class BillRepositoryCustomImpl implements BillRepositoryCustom {
    private MongoTemplate billTemplate;

    @Autowired
    BillRepositoryCustomImpl(MongoTemplate billTemplate) {
        this.billTemplate = billTemplate;
    }

    @Override
    public List<Bill> findByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        return billTemplate.find(q, Bill.class);
    }
}
