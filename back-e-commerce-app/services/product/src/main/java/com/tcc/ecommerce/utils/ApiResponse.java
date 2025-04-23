package com.tcc.ecommerce.utils;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ApiResponse<T> {
    final private int statusCode;
    final private Map<String, List<String>> headers;
    final private T data;
}
