package com.tcc.ecommerce.repository;

import com.tcc.ecommerce.document.Customer;
import com.tcc.ecommerce.document.UserLogin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, ObjectId> {

    @Query(value = "{ 'dni': ?0 }", exists = true)
    public boolean existsByDni(String dni);

    @Query(value = "{ 'user_login.email': ?0 }")
    public Optional<Customer> findByUserEmail(String email);
}
