package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Bill;
import com.narang.web.repository.BillRepository;
import com.narang.web.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BillRestController {
    private BillService billService;

    @Autowired
    BillRestController(BillService billService) {
        this.billService = billService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        // properties 설정도 있지만 java 구문으로 해결하는 방법 채택 (보기 쉽게 하기 위함)
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/bills")
    public String findAll() throws JsonProcessingException {
        return mapper(billService.findAll());
    }

    @GetMapping("/bill/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(billService.findById(id));
    }

    @GetMapping("/bill/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        return mapper(billService.findByUid(uid));
    }

    @PostMapping("/bill")
    public String insert(Bill bill) {
        return billService.insert(bill);
    }

    /**
     * 개발자용 삭제 로직
     * (덧, 영수증은 수정할 수 없으므로 수정 로직은 없음)
     */
    @DeleteMapping("/bill/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return billService.deleteById(id);
    }
}
