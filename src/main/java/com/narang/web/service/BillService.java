package com.narang.web.service;

import com.narang.web.entity.Bill;
import com.narang.web.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {
    private BillRepository billRepository;

    @Autowired
    BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> findAll() {
        return billRepository.findAll();
    }

    public Bill findById(String id) {
        return billRepository.findById(id).orElseThrow();
    }

    public List<Bill> findByUid(String uid) {
        return billRepository.findByUid(uid);
    }

    public String insert(Bill bill) {
        Bill newBill = billRepository.insert(bill);
        return newBill.getId();
    }

    public Boolean deleteById(String id) {
        billRepository.deleteById(id);
        return true;
    }
}
