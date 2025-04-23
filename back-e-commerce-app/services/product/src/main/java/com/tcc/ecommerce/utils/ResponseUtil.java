package com.tcc.ecommerce.utils;

import com.tcc.ecommerce.http_errors.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class ResponseUtil {

    public static <T> ResponseEntity buildResponseList(List<T> data) {
        ApiResponse<List<T>> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), new HashMap<>(), data);
        return ResponseEntity.status(apiResponse.getStatusCode()).contentType(MediaType.APPLICATION_JSON).body(apiResponse);
    }

    public static <T> ResponseEntity buildResponseObject(T data) {
        ApiResponse<T> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), new HashMap<>(), data);
        return ResponseEntity.status(apiResponse.getStatusCode()).contentType(MediaType.APPLICATION_JSON).body(apiResponse);
    }

    public static <T> ResponseEntity buildResponseVoid(HttpStatus code){
        ApiResponse<T> apiResponse = new ApiResponse<>(code.value(),new HashMap<>(), null);
        return ResponseEntity.status(code.value()).contentType(MediaType.APPLICATION_JSON).body(apiResponse);
    }

    public static <T> ResponseEntity handleError(ErrorMessage errorMessage) {
        Map<String, List<String>> errorHeaders = new HashMap<>();
        errorHeaders.put("Error-Name", Collections.singletonList(errorMessage.getError()));
        errorHeaders.put("Error-Message", Collections.singletonList(errorMessage.getMessage()));
        errorHeaders.put("Error-Code", Collections.singletonList(String.valueOf(errorMessage.getCode())));
        ApiResponse<List<T>> errorResponse = new ApiResponse<>(errorMessage.getCode(), errorHeaders, null);
        return ResponseEntity.status(errorMessage.getCode()).contentType(MediaType.APPLICATION_JSON).body(errorResponse);
    }
}
