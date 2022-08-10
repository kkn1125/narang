package com.narang.web.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "carts")
public class Cart {
    @Id
    private String id;

    private String uid;

    private String pid;

    private Long amount;

    private Boolean isOrdered;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @CreatedDate
    private LocalDateTime regdate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @LastModifiedDate
    private LocalDateTime updates;

    public Cart replaceIfNotNull(Cart compare) {
        List<Field> fields = Arrays.asList(this.getClass().getDeclaredFields());
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
