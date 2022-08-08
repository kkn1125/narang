package com.narang.web.entity;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;
import java.util.function.BiConsumer;
import java.util.stream.Stream;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "user")
public class User implements UserDetails {
    @Id
    private String id;
    private String userAuth;
    private Collection<? extends GrantedAuthority> authority;
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

    public Boolean compareWithPassword(String inputPassword) {
        System.out.println(inputPassword);
        System.out.println(this.password);
        return this.password.equals(inputPassword);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authority;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User replaceIfNotNull(User compare) {
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