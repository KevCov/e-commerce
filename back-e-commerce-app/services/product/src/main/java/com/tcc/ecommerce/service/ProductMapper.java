package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.BrandRequest;
import com.tcc.ecommerce.dto.request.CategoryRequest;
import com.tcc.ecommerce.dto.request.ProductRequest;
import com.tcc.ecommerce.dto.response.BrandResponse;
import com.tcc.ecommerce.dto.response.CategoryResponse;
import com.tcc.ecommerce.dto.response.ProductPurchaseResponse;
import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.entity.Brand;
import com.tcc.ecommerce.entity.Category;
import com.tcc.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    public Product toProduct(ProductRequest productRequest) {
        if (productRequest == null) {
            return null;
        } else {
            return Product.builder()
                    .name(productRequest.name())
                    .description(productRequest.description())
                    .largeDescription(productRequest.largedescription())
                    .countryOrigin(productRequest.countryOrigin())
                    .unitPrice(productRequest.unitPrice())
                    .stock(productRequest.stock())
                    .uom(productRequest.uom())
                    .brand(this.brandRequestToBrand(productRequest.brand()))
                    .category(this.categoryRequestToCategory(productRequest.category()))
                    .build();

        }
    }

    public ProductResponse toProductResponse(Product product) {
        if (product == null) {
            return null;
        } else {
            return ProductResponse.builder()
                    .id(product.getId().toString())
                    .name(product.getName())
                    .description(product.getDescription())
                    .largeDescription(product.getLargeDescription())
                    .countryOrigin(product.getCountryOrigin())
                    .unitPrice(product.getUnitPrice())
                    .uom(product.getUom())
                    .stock(product.getStock())
                    .urlImage(product.getUrlImage())
                    .brand(this.brandToBrandResponse(product.getBrand()))
                    .category(this.categoryToCategoryResponse(product.getCategory()))
                    .build();
        }
    }

    public ProductPurchaseResponse toProductPurchaseResponse(Product product, int quantityRequest) {
        if (product == null) {
            return null;
        } else {
            return ProductPurchaseResponse.builder()
                    .id(product.getId().toString())
                    .name(product.getName())
                    .description(product.getDescription())
                    .unitPrice(product.getUnitPrice())
                    .quantity(quantityRequest)
                    .build();
        }
    }

    private Brand brandRequestToBrand(BrandRequest brandRequest) {
        if (brandRequest == null) {
            return null;
        } else if (brandRequest.id() != null) {
            return Brand.builder()
                    .id(Long.parseLong(brandRequest.id()))
                    .name(brandRequest.name())
                    .build();
        } else {
            return Brand.builder()
                    .name(brandRequest.name())
                    .build();
        }
    }

    private Category categoryRequestToCategory(CategoryRequest categoryRequest) {
        if (categoryRequest == null) {
            return null;
        } else if (categoryRequest.id() != null) {
            return Category.builder()
                    .id(Long.parseLong(categoryRequest.id()))
                    .name(categoryRequest.name())
                    .build();
        } else {
            return Category.builder()
                    .name(categoryRequest.name())
                    .build();
        }
    }

    private BrandResponse brandToBrandResponse(Brand brand) {
        if (brand == null) {
            return null;
        } else {
            return BrandResponse.builder()
                    .id(brand.getId().toString())
                    .name(brand.getName())
                    .status(brand.isStatus())
                    .build();
        }
    }

    private CategoryResponse categoryToCategoryResponse(Category category) {
        if (category == null) {
            return null;
        } else {
            return CategoryResponse.builder()
                    .id(category.getId().toString())
                    .name(category.getName())
                    .build();
        }
    }
}
