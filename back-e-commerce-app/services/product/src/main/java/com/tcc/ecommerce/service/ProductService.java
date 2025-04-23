package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.ProductPurchaseRequest;
import com.tcc.ecommerce.dto.request.ProductRequest;
import com.tcc.ecommerce.dto.response.ProductPurchaseResponse;
import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.entity.Product;
import com.tcc.ecommerce.http_errors.exceptions.ConflictException;
import com.tcc.ecommerce.http_errors.exceptions.NotFoundException;
import com.tcc.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public List<ProductResponse> listAllProducts() {
        List<Product> products = repository.findAll();
        if (products.isEmpty()) {
            return Collections.emptyList();
        }

        return products.stream().map(mapper::toProductResponse).toList();
    }

    public List<ProductResponse> getThreeProductsWithOverStock() {
        List<Product> threeProducts = repository.threeProductsWithOverStock();
        if (threeProducts.isEmpty()) {
            return Collections.emptyList();
        }

        return threeProducts.stream().map(mapper::toProductResponse).toList();
    }

    public ProductResponse findProductById(Long id) {
        return mapper.toProductResponse(repository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("El producto con el id %d no fue encontrado, verificar el id", id))));
    }

    public List<ProductResponse> searchProductsByName(String name) {
        List<Product> products = repository.searchProductsByName(name);
        if (products.isEmpty()) {
            return Collections.emptyList();
        }

        return products.stream().map(mapper::toProductResponse).toList();
    }

    public Long createProduct(ProductRequest request) {
        if (repository.existsByName(request.name())){
            throw new ConflictException(String.format("El producto llamado %s ya existe", request.name()));
        }
        return repository.save(mapper.toProduct(request)).getId();
    }

    public void deleteProduct(Long id) {
        repository.findById(id).ifPresentOrElse(
                p -> repository.delete(p),
                () -> new NotFoundException(String.format("El producto con el id %d no fue encontrado, verificar el id", id))
        );
    }

    public List<ProductPurchaseResponse> purchaseProducts(List<ProductPurchaseRequest> request) {
        //Obtener una lista con solo los id de los productos en el request
        List<Long> idRequests = request.stream().map(ProductPurchaseRequest::id).toList();

        //Compara el id de los resultados y los ordena de manera ASC
        List<Product> storedProducts = repository.findAllById(idRequests)
                .stream().sorted(Comparator.comparing(Product::getId)).toList();

        //Verificar que la cantidad de productos en el request no sea mayor a la cantidad existente en la BD
        if (idRequests.size() > storedProducts.size())
            throw new ConflictException("Uno o más productos no existen, confirmar los productos");

        //Descontar las cantidad existentes por las requeridas
        List<ProductPurchaseRequest> tidyRequest = request.stream().sorted(Comparator.comparing(ProductPurchaseRequest::id)).toList();
        List<ProductPurchaseResponse> purchasedProducts = new ArrayList<>();
        return discountStock(storedProducts, tidyRequest);
    }

    private List<ProductPurchaseResponse> discountStock(List<Product> products, List<ProductPurchaseRequest> requests){
        List<ProductPurchaseResponse> purchasedProducts = new ArrayList<>();

        for (int i = 0; i < products.size(); i++){
            var product = products.get(i);
            var productRequest = requests.get(i);

            if (product.getStock() < productRequest.quantity())
                throw new ConflictException("No hay stock suficiente para el producto con ID: " + product.getId());

            //Actualizando el stock disponible
            int stockAvailable = product.getStock() - productRequest.quantity();
            product.setStock(stockAvailable);
            repository.save(product);

            purchasedProducts.add(mapper.toProductPurchaseResponse(product, productRequest.quantity()));
        }
        return purchasedProducts;
    }
}
