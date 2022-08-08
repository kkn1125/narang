package com.narang.web.entity;

import com.mongodb.lang.Nullable;
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

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("comment")
public class Comment {
    @Id
    private String id;
    @Field
    private String content;
    @Field
    private String mention;
    @Field
    private String author;
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

    public Comment replaceIfNotNull(Comment compare) {
        List<java.lang.reflect.Field> fields = Arrays.asList(this.getClass().getDeclaredFields());
        fields.forEach(field -> {
            try {
                field.setAccessible(true);
                Object compareField = field.get(compare);
                Object thisField = field.get(this);
                if (field.getName() == "userAuth") {
                    field.set(this, "USER");
                } else {
                    field.set(this, compareField != null ? compareField : thisField);
                }
            } catch (IllegalAccessException e) {
                System.out.println("The value is null [" + field.getName() + "]");
            }
        });
        return this;
    }
}
