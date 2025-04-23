package com.tcc.ecommerce.controller;

import com.tcc.ecommerce.dto.request.OrderRequest;
import com.tcc.ecommerce.dto.request.ShippingRequest;
import com.tcc.ecommerce.entity.Shipping;
import com.tcc.ecommerce.service.OrderService;
import com.tcc.ecommerce.service.ShippingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/orders")
public class OrderController {

    private final OrderService service;
    private final ShippingService shipService;

    @GetMapping
    public ResponseEntity findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping(value = "/create")
    public ResponseEntity createOrder(@RequestBody @Valid OrderRequest request) {
        return ResponseEntity.status(CREATED).body(service.createOrder(request));
    }

    @GetMapping(value = "/by-user/{userId}")
    public ResponseEntity getOrdersByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getAllOrdersByUser(userId));
    }

    @PostMapping(value = "/create-shipping")
    public ResponseEntity createShipping (@RequestBody ShippingRequest request) {
        return ResponseEntity.status(CREATED).body(shipService.createShipping(request));
    }

    @GetMapping(value = "/shipping/{customerId}")
    public ResponseEntity getAllShippingsByUser (@PathVariable String customerId) {
        return ResponseEntity.ok(shipService.findShippingsByCustomer(customerId));
    }
}
