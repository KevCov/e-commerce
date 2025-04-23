package com.tcc.ecommerce.repository;

import com.tcc.ecommerce.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {

    @Query(value = "SELECT * FROM shipping WHERE customer_id = ?1" , nativeQuery = true)
    public List<Shipping> findShippingByCustomerId(String customerId);
}
