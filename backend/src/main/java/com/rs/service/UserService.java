package com.rs.service;

import com.rs.contract.user.LoginUserRequest;
import com.rs.contract.user.RegisterUserRequest;
import com.rs.contract.user.UserJwtToken;
import com.rs.contract.user.UserResponse;
import com.rs.entity.Role;
import com.rs.entity.User;
import com.rs.entity.enums.ERole;
import com.rs.helper.exceptions.PasswordMismatchException;
import com.rs.helper.exceptions.ResourceNotFoundException;
import com.rs.repository.UserRepository;
import com.rs.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public CompletableFuture<User> getByEmail(String email) {
        return CompletableFuture.completedFuture(userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No user present with email: " + email)));
    }

    public CompletableFuture<UserResponse> registerUser(RegisterUserRequest registerUserRequest) {
        return CompletableFuture.completedFuture(getUser(registerUserRequest))
                .thenApply(userRepository::save)
                .thenApply(user -> {
                    String jwtToken = jwtUtils.generateJwtToken(registerUserRequest.getEmail());
                    return getUserResponse(jwtToken, user);
                });
    }

    public CompletableFuture<UserResponse> loginUser(LoginUserRequest loginUserRequest) {
        return CompletableFuture.completedFuture(authenticateUser(loginUserRequest))
                .thenApply(ignored -> jwtUtils.generateJwtToken(loginUserRequest.getEmail()))
                .thenCombine(getByEmail(loginUserRequest.getEmail()), this::getUserResponse);
    }

    private CompletionStage<Void> authenticateUser(LoginUserRequest loginUserRequest) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    loginUserRequest.getEmail(), loginUserRequest.getPassword());
            authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            return null;
        } catch (AuthenticationException authenticationException) {
            throw new ResourceNotFoundException("Invalid Email or Password!");
        }
    }

    private User getUser(RegisterUserRequest registerUserRequest) {
        Set<Role> roles = new HashSet<>();

        if (!registerUserRequest.getPassword().equals(registerUserRequest.getPasswordRepeat()))
            throw new PasswordMismatchException("Password did not match with Repeated Password!");

        User user = User.builder()
                .createdAt(LocalDateTime.now())
                .firstName(registerUserRequest.getFirstName())
                .lastName(registerUserRequest.getLastName())
                .email(registerUserRequest.getEmail())
                .password(bCryptPasswordEncoder.encode(registerUserRequest.getPassword()))
                .build();

        roles.add(Role.builder()
                .user(user)
                .role(ERole.ROLE_USER)
                .build());

        user.setRoles(roles);

        return user;
    }

    private UserResponse getUserResponse(String jwtToken, User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(user.getRoles()
                        .stream()
                        .map(role -> role.getRole().toString())
                        .collect(Collectors.toSet()))
                .token(new UserJwtToken(jwtToken))
                .build();
    }
}
