package com.tcc.ecommerce.repository;

import com.tcc.ecommerce.dto.response.OrderResponse;
import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM customer_order WHERE customer_id = ?1", nativeQuery = true)
    public List<Order> getOrdersByUserId(String userId);

    @Procedure("products_by_order")
    public List<Object[]> getProductsByOrderRaw(@Param("orderId") Long orderId);

    default List<ProductResponse> getProductsByOrder(@Param("orderId") Long orderId) {
        List<Object[]> results = getProductsByOrderRaw(orderId);
        return results.stream()
                .map(result -> {
                    return ProductResponse.builder()
                            .id(result[0].toString())
                            .name(result[1].toString())
                            .description(result[2].toString())
                            .quantity(result[3].toString())
                            .urlImage(result[4].toString())
                            .unitPrice(result[5].toString())
                            .build();
                })
                .toList();
    }
}
