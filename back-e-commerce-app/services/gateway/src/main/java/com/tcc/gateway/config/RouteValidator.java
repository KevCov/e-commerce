package com.tcc.gateway.config;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/auth/login",
            "/api/v1/products",
            "/api/v1/products/over-stock",
            "/api/v1/customers/create",
            "api/v1/products/{id}"
    );

    public Predicate<ServerHttpRequest> isPublicEndpoint =
            request -> openApiEndpoints
                    .stream()
                    .anyMatch(uri -> request.getURI().getPath().contains(uri));

}