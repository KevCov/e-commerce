package com.tcc.ecommerce.service;

import com.tcc.ecommerce.document.Customer;
import com.tcc.ecommerce.document.UserLogin;
import com.tcc.ecommerce.dto.request.CustomerRequest;
import com.tcc.ecommerce.dto.response.CustomerResponse;
import com.tcc.ecommerce.dto.response.UserLoginResponse;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

    public Customer toCustomer(CustomerRequest request) {
        if (request == null) {
            return null;
        } else {
            return Customer.builder()
                    .firstName(request.firstName())
                    .lastName(request.lastName())
                    .userLogin(request.userLogin())
                    .dni(request.dni())
                    .phoneNumber(request.phoneNumber())
                    .userLogin(request.userLogin())
                    .address(request.address())
                    .build();
        }
    }

    public CustomerResponse toCustomerResponse(Customer customer) {
        if(customer == null) {
            return null;
        } else {
            return CustomerResponse.builder()
                    .id(customer.getId().toString())
                    .firstName(customer.getFirstName())
                    .lastName(customer.getLastName())
                    .dni(customer.getDni())
                    .phoneNumber(customer.getPhoneNumber())
                    .email(customer.getUserLogin().getEmail())
                    .address(customer.getAddress())
                    .build();

        }
    }

    public UserLoginResponse toUserLoginResponse(Customer customer) {
        return UserLoginResponse.builder()
                .email(customer.getUserLogin().getEmail())
                .password(customer.getUserLogin().getPassword())
                .role(customer.getUserLogin().getRole())
                .accountNonExpired(customer.getUserLogin().isAccountNonExpired())
                .accountNonLocked(customer.getUserLogin().isAccountNonLocked())
                .build();
    }
}
