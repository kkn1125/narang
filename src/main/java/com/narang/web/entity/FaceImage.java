package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("faceImage")
public class FaceImage {
    @Id
    private String _id;
    @Field
    private String imgPath;
    @Field
    private Timestamp regdate;
}
