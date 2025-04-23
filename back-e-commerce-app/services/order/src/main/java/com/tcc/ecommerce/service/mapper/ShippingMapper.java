package com.tcc.ecommerce.service.mapper;

import com.tcc.ecommerce.dto.request.ShippingRequest;
import com.tcc.ecommerce.dto.response.ShippingResponse;
import com.tcc.ecommerce.entity.Shipping;
import org.springframework.stereotype.Service;

@Service
public class ShippingMapper {
    public ShippingResponse toShippingResponse (Shipping shipping) {
        return ShippingResponse.builder()
                .id(shipping.getId().toString())
                .department(shipping.getDepartment())
                .province(shipping.getProvince())
                .district(shipping.getDistrict())
                .street(shipping.getStreet())
                .zipCode(shipping.getZipCode())
                .customerId(shipping.getCustomerId())
                .houseNumber(shipping.getHouseNumber())
                .build();
    }

    public Shipping toShipping (ShippingRequest request) {
        return Shipping.builder()
                .customerId(request.customerId())
                .department(request.department())
                .province(request.province())
                .district(request.district())
                .street(request.street())
                .houseNumber(request.houseNumber())
                .zipCode(request.zipCode())
                .build();
    }
}
