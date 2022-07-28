package com.narang.web.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String nickName;
    private String email;
    private String password;
    private String phone;
    private Boolean isFaceSign;
}
