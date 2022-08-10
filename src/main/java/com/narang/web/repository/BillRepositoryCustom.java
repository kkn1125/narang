package com.narang.web.repository;

import com.narang.web.entity.Bill;

import java.util.List;

public interface BillRepositoryCustom {
    public List<Bill> findByUid(String uid);
}
