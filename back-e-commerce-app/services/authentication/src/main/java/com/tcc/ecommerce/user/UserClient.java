package com.tcc.ecommerce.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "customer-endpoint", url = "http://localhost:8090/api/v1/customers")
public interface UserClient {
    @GetMapping(value = "/verify/{email}")
    public UserResponse verifyUserLogin(@PathVariable String email);
}
