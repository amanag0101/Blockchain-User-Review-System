package com.rs.contract.user;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
@Data
public class UserResponse {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Set<String> roles;

    private UserJwtToken token;
}
