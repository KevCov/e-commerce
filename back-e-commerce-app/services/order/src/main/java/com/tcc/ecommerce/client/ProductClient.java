package com.tcc.ecommerce.client;

import com.tcc.ecommerce.dto.request.PurchaseRequest;
import com.tcc.ecommerce.dto.response.PurchaseResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "product-service", url = "${application.config.product-url}")
public interface ProductClient {

    @PostMapping(value = "/purchase")
    public List<PurchaseResponse> purchaseProducts(@RequestBody List<PurchaseRequest> requestBody);
}
