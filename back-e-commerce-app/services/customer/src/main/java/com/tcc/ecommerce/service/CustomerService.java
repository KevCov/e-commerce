package com.tcc.ecommerce.service;

import com.tcc.ecommerce.document.Customer;
import com.tcc.ecommerce.document.UserLogin;
import com.tcc.ecommerce.dto.request.CustomerRequest;
import com.tcc.ecommerce.dto.response.CustomerResponse;
import com.tcc.ecommerce.dto.response.UserLoginResponse;
import com.tcc.ecommerce.http_errors.exceptions.ConflictException;
import com.tcc.ecommerce.http_errors.exceptions.NotFoundException;
import com.tcc.ecommerce.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;
    private final CustomerMapper mapper;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public List<CustomerResponse> listAllCustomers() {
        List<Customer> customers = repository.findAll();
        if (customers.isEmpty())
            return Collections.emptyList();

        return customers.stream().map(mapper::toCustomerResponse).toList();
    }
    
    public CustomerResponse findCustomerById(ObjectId id) {
        return mapper.toCustomerResponse(repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente con el id: " + id.toString() + " no fue encontrado")));
    }

    public CustomerResponse findCustomerByEmail(String email) {
        return mapper.toCustomerResponse(repository.findByUserEmail(email)
                .orElseThrow(() -> new NotFoundException("Cliente con el email: " + email + " no fue encontrado")));
    }

    public UserLoginResponse findUserLoginToVerify(String email) {
        return mapper.toUserLoginResponse(repository.findByUserEmail(email)
                .orElseThrow(() -> new NotFoundException("Cliente con el email: " + email + " no fue encontrado")));
    }

    public ObjectId createCustomer(CustomerRequest request) {
        try {
            Customer customer = mapper.toCustomer(request);
            customer.getUserLogin().setPassword(encoder.encode(request.userLogin().getPassword()));

            return repository.save(customer).getId();

        } catch (DuplicateKeyException exception) {
            String emsg = exception.getMessage();
            if(emsg.contains("idx_email")){
                throw new ConflictException("El email ya esta en uso, intenta con otro email");
            } else if(emsg.contains(("idx_dni"))) {
                throw new ConflictException("El DNI ya existe");
            } else {
                throw new ConflictException(emsg);
            }
        }
    }
    
    public void disableCustomer(ObjectId id) {
        repository.findById(id).ifPresentOrElse(
                c -> {
                   c.setStatus(false);
                   repository.save(c);
                }, () -> new NotFoundException("Cliente con el id: " + id.toString() + " no fue encontrado")
        );
    }

    public void deleteCustomer(ObjectId id) {
        repository.findById(id).ifPresentOrElse(
                c -> repository.delete(c), () -> new NotFoundException("Cliente con el id: " + id.toString() + " no fue encontrado")
        );
    }
    
    public boolean existsCustomer(ObjectId id) {
        return repository.existsById(id);
    }

    public void editPartialInfoCustomer(ObjectId id, CustomerRequest request) {
        repository.findById(id).ifPresentOrElse(
                c -> {
                    c.setAddress(request.address());
                    c.setPhoneNumber(request.phoneNumber());
                    repository.save(c);
                }, () -> new NotFoundException("Cliente con el id: " + id.toString() + " no fue encontrado")
        );
    }
}
