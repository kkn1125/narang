package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bills")
public class Bill {

    @Id
    private String bid;

    private String pid;

    private String uid;

    private Long amount;

    private Long price;

    @CreatedDate
    private LocalDateTime regdate;
}
