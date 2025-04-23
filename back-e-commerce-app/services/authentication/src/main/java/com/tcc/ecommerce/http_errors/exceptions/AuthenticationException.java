package com.tcc.ecommerce.http_errors.exceptions;

public class AuthenticationException extends RuntimeException{
    private static final String DESCRIPTION = "Authentication Exception";

    public AuthenticationException(String detail) {
        super(DESCRIPTION + ". " + detail);
    }
}
