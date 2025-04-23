package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.ShippingRequest;
import com.tcc.ecommerce.dto.response.ShippingResponse;
import com.tcc.ecommerce.entity.Shipping;
import com.tcc.ecommerce.repository.ShippingRepository;
import com.tcc.ecommerce.service.mapper.ShippingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ShippingService {

    private final ShippingRepository repository;
    private final ShippingMapper mapper;

    public ShippingResponse createShipping (ShippingRequest request) {
        return mapper.toShippingResponse(repository.save(mapper.toShipping(request)));
    }

    public List<ShippingResponse> findShippingsByCustomer(String customerId) {
        List<Shipping> shippings = repository.findShippingByCustomerId(customerId);
        if (shippings.isEmpty()) {
            return Collections.emptyList();
        }

        return shippings.stream().map(mapper::toShippingResponse).toList();
    }
}
