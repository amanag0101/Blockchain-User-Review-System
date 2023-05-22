package com.rs.contract.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RegisterUserRequest {
    @NotEmpty(message = "First Name cannot be empty!")
    private String firstName;

    @NotEmpty(message = "Last Name cannot be empty!")
    private String lastName;

    @NotEmpty(message = "Email cannot be empty!")
    @Email(message = "Invalid Email!")
    private String email;

    @NotEmpty(message = "Password cannot be empty!")
    @Size(min = 6, message = "Min length of password should be 6!")
    @ToString.Exclude
    private String password;

    @NotEmpty(message = "Repeated Password cannot be empty!")
    @Size(min = 6, message = "Min length of password should be 6!")
    @ToString.Exclude
    private String passwordRepeat;
}

