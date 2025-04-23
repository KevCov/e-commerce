package com.tcc.ecommerce.controller;

import com.tcc.ecommerce.dto.PaymentRequest;
import com.tcc.ecommerce.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping
    public ResponseEntity createPayment(@RequestBody @Valid PaymentRequest request) {
        service.createPayment(request);
        return ResponseEntity.ok().build();
    }
}
