package com.rs.helper;

import com.rs.contract.api.ApiResponse;
import com.rs.helper.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    private static final String MESSAGE_FIELD = "message";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException exception) {
        Map<String, String> errorMessageMap = Collections.singletonMap(MESSAGE_FIELD, exception.getMessage());
        ApiResponse response = new ApiResponse(errorMessageMap);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
