package com.narang.web.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String _id;
    private String nickName;
    private String email;
    private String password;
    private String phone;
    private String profileImg;
    private Boolean isFaceSign;
    private Boolean terms;
    private String _class;
}
