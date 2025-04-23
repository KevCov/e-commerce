package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.BrandRequest;
import com.tcc.ecommerce.http_errors.exceptions.NotFoundException;
import com.tcc.ecommerce.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository repository;
    private final BrandMapper mapper;

    public void createBrand(BrandRequest request) {
        repository.save(mapper.toBrand(request));
    }

    public boolean disableBrand(BrandRequest request) {
        repository.findById(mapper.toBrand(request).getId()).ifPresentOrElse(
                brand -> {
                    brand.setStatus(false);
                    repository.save(brand);
                }, () -> new NotFoundException("No se encontro el Brand")
        );

        return true;
    }
}
