package com.tcc.ecommerce.controller;

import com.tcc.ecommerce.dto.request.ProductPurchaseRequest;
import com.tcc.ecommerce.dto.request.ProductRequest;
import com.tcc.ecommerce.dto.response.ProductPurchaseResponse;
import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.service.ProductService;
import com.tcc.ecommerce.utils.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping()
    public ResponseEntity listAllProducts(Pageable pageable){
        return ResponseEntity.ok(service.listAllProducts(pageable));
    }

    @GetMapping(value = "/over-stock")
    public ResponseEntity<List<ProductResponse>> listProductsOverStock(){
        return ResponseEntity.ok(service.getThreeProductsWithOverStock());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductResponse> findProductById(@PathVariable Long id){
        return ResponseEntity.ok(service.findProductById(id));
    }

    @PostMapping(value = "/purchase")
    public ResponseEntity<List<ProductPurchaseResponse>> purchaseProducts(@RequestBody @Valid List<ProductPurchaseRequest> requests){
        return ResponseEntity.ok(service.purchaseProducts(requests));
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Long> createProduct(@RequestBody @Valid ProductRequest request){
        return ResponseEntity.status(CREATED).body(service.createProduct(request));
    }
}
