package com.tcc.ecommerce.http_errors;

import com.tcc.ecommerce.http_errors.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({
            UnauthorizedException.class
    })
    @ResponseBody
    public void unauthorizedRequest() {
        //Empty
    }

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler({
            NotFoundException.class
    })
    @ResponseBody
    public ResponseEntity notFoundRequest(Exception exception) {
        return ResponseEntity.status(NOT_FOUND).body(new ErrorMessage(exception, NOT_FOUND.value()));
    }

    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler({
            BadRequestException.class,
            org.springframework.dao.DuplicateKeyException.class,
            org.springframework.web.bind.support.WebExchangeBindException.class,
            org.springframework.http.converter.HttpMessageNotReadableException.class,
            org.springframework.web.server.ServerWebInputException.class
    })
    @ResponseBody
    public ResponseEntity badRequest(Exception exception) {
        return ResponseEntity.status(BAD_REQUEST).body(new ErrorMessage(exception, BAD_REQUEST.value()));
    }

    @ResponseStatus(CONFLICT)
    @ExceptionHandler({
            ConflictException.class
    })
    @ResponseBody
    public ResponseEntity conflict(Exception exception) {
        return ResponseEntity.status(CONFLICT).body(new ErrorMessage(exception, CONFLICT.value()));
    }

    @ResponseStatus(FORBIDDEN)
    @ExceptionHandler({
            ForbiddenException.class
    })
    @ResponseBody
    public ResponseEntity forbidden(Exception exception) {
        return ResponseEntity.status(FORBIDDEN).body(new ErrorMessage(exception, FORBIDDEN.value()));
    }

    @ResponseStatus(BAD_GATEWAY)
    @ExceptionHandler({
            BadGatewayException.class
    })
    @ResponseBody
    public ResponseEntity badGateway(Exception exception) {
        return ResponseEntity.status(BAD_GATEWAY).body(new ErrorMessage(exception, BAD_GATEWAY.value()));
    }

    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ExceptionHandler({
            Exception.class
    })
    @ResponseBody
    public ResponseEntity exception(Exception exception) {
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ErrorMessage(exception, INTERNAL_SERVER_ERROR.value()));
    }
}