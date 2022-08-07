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
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "diary")
public class Diary {
    @Id
    private String id;
    @Field
    private String uid;
    @Field
    private String title;
    @Field
    private String content;
    @Field
    private String author;
    @Field
    private Boolean isShare;
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

    public Diary replace(Diary compare) {
        this.title = compare.getTitle();
        this.content = compare.getContent();
        this.isShare = compare.getIsShare();
        return this;
    }
}
