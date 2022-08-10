package com.narang.web.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityService {
    private PasswordEncoder encoder;

    @Autowired
    SecurityService(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String createToken(String subject, long exp) {
        if (exp <= 0) {
            throw new RuntimeException("만료되었습니다.");
        }
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder().setSubject(subject).signWith(signingKey, signatureAlgorithm).setExpiration(new Date(System.currentTimeMillis() + exp)).compact();
    }

    public String logout(String subject) {
        return createToken(subject, 0);
    }

    public String getSubject(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY)).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public String passwordEncode(String password) {
        return encoder.encode(password);
    }

    public Boolean matchPassword(String rawPassword, String password) {
        return encoder.matches(rawPassword, password);
    }
}
