package com.tcc.ecommerce.controller;

import com.tcc.ecommerce.dto.request.CustomerRequest;
import com.tcc.ecommerce.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;

    @GetMapping()
    public ResponseEntity listAllCustomers() {
        return ResponseEntity.ok(service.listAllCustomers());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findCustomerById(@PathVariable ObjectId id) {
        return ResponseEntity.ok(service.findCustomerById(id));
    }
    @GetMapping(value = "/profile/{email}")
    public ResponseEntity findCustomerByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.findCustomerByEmail(email));
    }

    @GetMapping(value = "/verify/{email}")
    public ResponseEntity verifyUserLogin(@PathVariable String email) {
        return ResponseEntity.ok(service.findUserLoginToVerify(email));
    }

    @GetMapping(value = "/exists/{id}")
    public ResponseEntity existsCustomerById(@PathVariable ObjectId id) {
        return ResponseEntity.ok(service.existsCustomer(id));
    }

    @PostMapping(value = "/create")
    public ResponseEntity createCustomer(@RequestBody @Valid CustomerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createCustomer(request));
    }

    @PatchMapping(value = "/{id}/disable")
    public ResponseEntity disableCustomer(@PathVariable ObjectId id) {
        service.disableCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
