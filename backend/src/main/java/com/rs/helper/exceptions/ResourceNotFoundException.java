package com.rs.helper.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    private final String message;
}
