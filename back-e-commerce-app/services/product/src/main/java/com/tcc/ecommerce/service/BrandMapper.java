package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.BrandRequest;
import com.tcc.ecommerce.entity.Brand;
import org.springframework.stereotype.Service;

@Service
public class BrandMapper {
    public Brand toBrand(BrandRequest request) {
        return Brand.builder()
                .name(request.name())
                .build();
    }
}
