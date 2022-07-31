package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "user")
public class User {
    @Id
    private String _id;
    @Field
    private String nickName;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private String phone;
    @Field
    private String profileImg;
    @Field
    private Boolean isFaceSign;
    @Field
    private Boolean terms;
    @DateTimeFormat(style = "M-")
    @CreatedDate
    @Field
    private Date regdate;
    @DateTimeFormat(style = "M-")
    @LastModifiedDate
    @Field
    private Date updates;
    @Field
    private String _class;
}
