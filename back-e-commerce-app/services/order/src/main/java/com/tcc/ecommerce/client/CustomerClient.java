package com.tcc.ecommerce.client;

import com.tcc.ecommerce.dto.response.CustomerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "customer-service", url = "${application.config.customer-url}")
public interface CustomerClient {

    @GetMapping(value = "/{id}")
    public Optional<CustomerResponse> findCustomerById(@PathVariable String id);
}
