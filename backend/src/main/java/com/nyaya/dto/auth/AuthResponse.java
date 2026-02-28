package com.nyaya.dto.auth;

import com.nyaya.model.Role;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;

    private UUID userId;
    private String fullName;
    private String email;
    private Role role;
}

