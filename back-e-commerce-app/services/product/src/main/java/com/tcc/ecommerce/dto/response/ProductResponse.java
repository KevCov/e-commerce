package com.tcc.ecommerce.dto.response;

import com.tcc.ecommerce.dto.request.BrandRequest;
import com.tcc.ecommerce.dto.request.CategoryRequest;
import com.tcc.ecommerce.utils.enums.Uom;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ProductResponse(
        String id,
        String name,
        String description,
        String largeDescription,
        String countryOrigin,
        BigDecimal unitPrice,
        Uom uom,
        int stock,
        String urlImage,
        BrandResponse brand,
        CategoryResponse category
) {
}
