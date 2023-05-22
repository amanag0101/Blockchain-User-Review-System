package com.rs.controller;

import com.rs.contract.user.LoginUserRequest;
import com.rs.contract.user.RegisterUserRequest;
import com.rs.contract.user.UserResponse;
import com.rs.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.concurrent.CompletionStage;

@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", produces = "application/json")
    public CompletionStage<ResponseEntity<UserResponse>> registerUser(@Valid @RequestBody RegisterUserRequest registerUserRequest) {
        log.info("Received request to register user: " + registerUserRequest.toString());
        return userService.registerUser(registerUserRequest)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping(value = "/login", produces = "application/json")
    public CompletionStage<ResponseEntity<UserResponse>> loginUser(@Valid @RequestBody LoginUserRequest loginUserRequest) {
        log.info("Received request to login user: " + loginUserRequest.toString());
        return userService.loginUser(loginUserRequest)
                .thenApply(ResponseEntity::ok);
    }
}