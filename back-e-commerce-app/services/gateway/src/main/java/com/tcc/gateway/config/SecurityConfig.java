package com.tcc.gateway.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcc.gateway.enums.Role;
import com.tcc.gateway.http_errors.ErrorMessage;
import com.tcc.gateway.http_errors.exceptions.AuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity.CsrfSpec;
import org.springframework.security.config.web.server.ServerHttpSecurity.FormLoginSpec;
import org.springframework.security.config.web.server.ServerHttpSecurity.HttpBasicSpec;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.tcc.gateway.enums.Permission.ADMIN_READ;
import static com.tcc.gateway.enums.Permission.USER_READ;
import static com.tcc.gateway.enums.Role.ADMIN;
import static com.tcc.gateway.enums.Role.USER;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.GET;

@Slf4j
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    private SecretKey secretKey;

    public SecurityConfig(@Value("${jwt.secret}") String sk) {
        byte[] keyBytes = Decoders.BASE64.decode(sk);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(CsrfSpec::disable)
                .cors(ServerHttpSecurity.CorsSpec::disable)
                .httpBasic(HttpBasicSpec::disable)
                .formLogin(FormLoginSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/auth/login").permitAll()
                        .pathMatchers(OPTIONS, "/**").permitAll()
                        .pathMatchers(GET, "/api/v1/products").permitAll()
                        .pathMatchers(GET, "/api/v1/products/over-stock").permitAll()
                        .pathMatchers("/api/v1/products/**").hasAnyRole(ADMIN.name(), USER.name())
                        .pathMatchers("/api/v1/order/**").hasAnyRole(ADMIN.name(), USER.name())
                        .pathMatchers("/api/v1/customers/**").hasAnyRole(ADMIN.name(), USER.name())
                        .pathMatchers(GET, "/api/v1/products").hasAuthority(ADMIN_READ.name())
                        .pathMatchers(GET, "/api/v1/customers").hasAuthority(USER_READ.name())
                        .anyExchange().authenticated()
                )
                .addFilterAt(jwtAuthenticationFilter(), SecurityWebFiltersOrder.HTTP_BASIC)
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .build();
    }

    public WebFilter jwtAuthenticationFilter() {
        return (exchange, chain) -> {
            if (
                    exchange.getRequest().getPath().toString().equals("/auth/login") ||
                            exchange.getRequest().getPath().toString().equals("/api/v1/products") ||
                            exchange.getRequest().getPath().toString().equals("/api/v1/products/over-stock") ||
                            exchange.getRequest().getMethod() == OPTIONS
            ) {
                return chain.filter(exchange);
            }

            log.info("Entrando al filtro de validacion: " + exchange.getRequest().getURI());

            if (!exchange.getRequest().getHeaders().containsKey(AUTHORIZATION)) {
                throw new AuthenticationException("Falta el header autorizacion");
            }

            String authHeader = exchange.getRequest().getHeaders().get(AUTHORIZATION).get(0);
            String token = null;
            String username = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                username = extractUserName(token);
            }

            Role role = Role.valueOf(extractRole(token).toUpperCase());

            if (role != null) {
                try {
                    List<SimpleGrantedAuthority> authorities = role.getPermissions()
                            .stream()
                            .filter(permission -> permission != null)
                            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                            .collect(Collectors.toCollection(ArrayList::new));
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);

                    Claims claims = Jwts.parser()
                            .verifyWith(secretKey)
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();

                    return chain.filter(exchange)
                            .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
                } catch (MalformedJwtException e) {
                    return buildErrorResponse(exchange, e, 400);
                } catch (SignatureException e) {
                    return buildErrorResponse(exchange, e, 401);
                } catch (ExpiredJwtException e) {
                    return buildErrorResponse(exchange, e, 403);
                } catch (Exception e) {
                    return buildErrorResponse(exchange, e, 403);
                }
            }
            return chain.filter(exchange);
        };
    }

    private Mono<Void> buildErrorResponse(ServerWebExchange exchange, Exception exception, int statusCode) {
        try {
            ErrorMessage errorMessage = new ErrorMessage(exception, statusCode);
            byte[] errorBytes = new ObjectMapper().writeValueAsBytes(errorMessage);
            exchange.getResponse().setStatusCode(HttpStatus.valueOf(statusCode));
            return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(errorBytes)));
        } catch (Exception e) {
            log.error("Error al construir la respuesta de error", e);
            return Mono.error(e);
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    private String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    private String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
