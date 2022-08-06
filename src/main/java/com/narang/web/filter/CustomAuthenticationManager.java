package com.narang.web.filter;

import com.narang.web.entity.User;
import com.narang.web.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class CustomAuthenticationManager implements AuthenticationManager {
    @Autowired
    CustomUserDetailsService service;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        User user = service.loadUserByUsername((String) authentication.getPrincipal());
        return new UsernamePasswordAuthenticationToken(user.getUsername()
                , user.getPassword()
                , user.getAuthorities());
    }
}
