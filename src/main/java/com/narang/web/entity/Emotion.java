package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "emotion")
public class Emotion {
    @Id
    private String id;
    @Field
    private String uid;
    @Field
    private String did;
    @Field
    private String advice;
    @Field
    private float comparative;
    @Field
    private String emoji;
    @Field
    private Whether negative;
    @Field
    private Whether positive;
    @Field
    private Normal normal;
    @Field
    private Integer score;
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
