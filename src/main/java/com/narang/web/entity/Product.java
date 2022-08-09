package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    private Boolean isSoldOut = false;

    @CreatedDate
    private LocalDateTime regdate;

    @LastModifiedDate
    private LocalDateTime updates;

    public Product replace(Product compare) {
        this.setCategory(compare.getCategory() != null ? compare.getCategory() : this.getCategory());
        this.setName(compare.getName() != null ? compare.getName() : this.getName());
        this.setPrice(compare.getPrice() != null ? compare.getPrice() : this.getPrice());
        this.setAmount(compare.getAmount() != null ? compare.getAmount() : this.getAmount());
        this.setContent(compare.getContent() != null ? compare.getContent() : this.getContent());
        this.setSeller(compare.getSeller() != null ? compare.getSeller() : this.getSeller());
        this.setIsSoldOut(compare.getIsSoldOut() == true ? compare.getIsSoldOut() : this.getIsSoldOut());
        return this;
    }
}


