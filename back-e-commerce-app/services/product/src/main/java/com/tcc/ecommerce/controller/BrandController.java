package com.tcc.ecommerce.controller;

import com.tcc.ecommerce.dto.request.BrandRequest;
import com.tcc.ecommerce.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService service;

    @PostMapping("/create")
    public ResponseEntity createBrand(BrandRequest request) {
        service.createBrand(request);
        return ResponseEntity.ok().build();
    }
}
