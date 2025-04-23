package com.tcc.ecommerce.jwt;

import com.tcc.ecommerce.auth.AuthResponse;
import com.tcc.ecommerce.http_errors.exceptions.AuthenticationException;
import com.tcc.ecommerce.user.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
@Slf4j
public class JwtService {

    @Value("${jwt.expiration.token}")
    private long timeToken;

    @Value("${jwt.expiration.refreshToken}")
    private long timeRefreshToken;

    private final SecretKey secretKey;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserClient client;

    public JwtService(@Value("${jwt.secret}") String sk) {
        byte[] keyBytes = Decoders.BASE64.decode(sk);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public AuthResponse generateToken(UserRequest userRequest) throws AuthenticationException {

        UserResponse userDetails = client.verifyUserLogin(userRequest.email());

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.email(), userRequest.password())
        );

        if(authentication.isAuthenticated()) {
            return new AuthResponse(
                    buildToken(userRequest.email(), timeToken, userDetails.role().toString()),
                    buildToken(userRequest.email(), timeRefreshToken, userDetails.role().toString())
            );
        }

        throw new AuthenticationException("Error en la autenticacion");
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {

    }

    private String buildToken(String email, long expirationTime, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey)
                .compact();
    }
}