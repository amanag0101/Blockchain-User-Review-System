package com.rs.security;

import com.rs.helper.exceptions.ResourceNotFoundException;
import com.rs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class UserDetailsServiceImplementation implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return CompletableFuture.completedFuture(userRepository.findByEmail(email)
                        .orElseThrow(() -> new ResourceNotFoundException("No user present with email: " + email)))
                .thenApply(UserDetailsImplementation::new)
                .join();
    }
}
