package com.somotfg.main.security;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.somotfg.main.model.AppUser;


@Component
@PropertySource("classpath:nosubir.properties")
public class JwtTokenUtil {
    
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    private static final Integer ACCES_TOKEN_LIFE = 20;

    public String generateAccessToken(AppUser user) {

        Algorithm algorithm = Algorithm.HMAC512(jwtSecret.getBytes());

        List<String> authorities = new ArrayList<>();
        authorities.add(user.getRole());

        return JWT.create()
                .withSubject(String.format("%s,%s", user.getId(), user.getUsername()))
                .withIssuer(jwtIssuer)
                .withClaim("roles", authorities)
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCES_TOKEN_LIFE * 60 * 1000))
                .sign(algorithm);
    }

    public String generateRefreshToken(AppUser user) {
        Algorithm algorithm = Algorithm.HMAC512(jwtSecret.getBytes());

        return JWT.create()
                .withSubject(String.format("%s,%s", user.getId(), user.getUsername()))
                .withIssuer(jwtIssuer)
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .sign(algorithm);
    }

    public boolean validate(String token) {
        try {
            Long expiresAt = JWT.decode(token).getExpiresAt().getTime();
            Calendar cal = Calendar.getInstance();
            if (expiresAt >= cal.getTime().getTime()) {
                return true;
            }
        } catch (IllegalArgumentException e) {
            System.out.println(String.format("JWT is invalid - {%s}", e.getMessage()));
        }

        return false;
    }

    public String getUserName(String token) {
        String subject = JWT.decode(token).getSubject();

        return subject.split(",")[1];
    }

}
