package com.narang.web.restController;

import com.narang.web.entity.Bill;
import com.narang.web.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BillRestController {

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/bills")
    public ResponseEntity<?> getAllBills() {
        List<Bill> bills = billRepository.findAll();
        if (bills.size() > 0) {
            return new ResponseEntity<List<Bill>>(bills, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("조회할 영수증이 없습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/bills/{uid}")
    public ResponseEntity<?> getSingleBill(@PathVariable("uid") String id) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isPresent()) {
            return new ResponseEntity<>(billOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("uid가 [" + id + "]인 영수증이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/bill")
    public ResponseEntity<?> createBill(@RequestBody Bill bill) {
        try {
            billRepository.save(bill);
            return new ResponseEntity<Bill>(bill, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 개발자용 삭제 로직
     * (덧, 영수증은 수정할 수 없으므로 수정 로직은 없음)
     */
    @DeleteMapping("/bill/{bid}")
    public ResponseEntity<?> deleteBill(@PathVariable("bid") String id) {
        try{
            billRepository.deleteById(id);
            return new ResponseEntity<>("bid [" + id + "]인 영수증이 성공적으로 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
