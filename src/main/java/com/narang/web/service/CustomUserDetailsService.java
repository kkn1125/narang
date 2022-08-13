package com.narang.web.service;

import com.narang.web.entity.User;
import com.narang.web.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository repository;

    CustomUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email).orElseThrow();
        return user;
    }
}
