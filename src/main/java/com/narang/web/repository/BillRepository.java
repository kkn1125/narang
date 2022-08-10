package com.narang.web.repository;

import com.narang.web.entity.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface BillRepository extends MongoRepository<Bill, String>, BillRepositoryCustom {
}
