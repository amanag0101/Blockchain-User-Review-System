package com.rs.contract.api;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@AllArgsConstructor
@Data
public class ApiResponse {
    private Map<String, String> response;
}
