package com.rs.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtUtils {
    private final String jwtSecret;
    private final String jwtExpirationInMilliseconds;

    @Autowired
    public JwtUtils(@Value("${jwt.secret}") String jwtSecret,
                    @Value("${jwt.expiration.in.milliseconds}") String jwtExpirationInMilliseconds) {
        this.jwtSecret = jwtSecret;
        this.jwtExpirationInMilliseconds = jwtExpirationInMilliseconds;
    }

    public String generateJwtToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date((new Date()).getTime() + Integer.parseInt(jwtExpirationInMilliseconds)))
                .sign(Algorithm.HMAC512(jwtSecret));
    }

    public Boolean verifyJwtToken(String jwtToken) {
        try {
            JWT.require(Algorithm.HMAC512(jwtSecret))
                    .build()
                    .verify(jwtToken);
            return true;
        } catch (JWTVerificationException exception) {
            log.error("Invalid JWT Signature: " + exception.getMessage());
        }

        return false;
    }

    public String getUsernameFromJwtToken(String jwtToken) {
        return JWT.decode(jwtToken)
                .getSubject();
    }
}
