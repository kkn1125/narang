package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String pid;

    private String category;

    private String name;

    private Long price;

    private Long amount;

    private String content;

    private String seller;

    private Boolean isSoldOut;

    private Date regdate;

    private Date updates;
}
