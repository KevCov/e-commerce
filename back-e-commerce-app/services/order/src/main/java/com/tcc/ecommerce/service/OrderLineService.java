package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.request.OrderLineRequest;
import com.tcc.ecommerce.repository.OrderLineRepository;
import com.tcc.ecommerce.service.mapper.OrderLineMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderLineService {

    private final OrderLineRepository repository;
    private final OrderLineMapper mapper;

    public void saveOrderLine(OrderLineRequest request) {
        repository.save(mapper.toOrderLine(request)).getId();
    }
}
