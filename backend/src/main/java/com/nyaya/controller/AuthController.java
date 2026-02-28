package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.auth.AuthRequest;
import com.nyaya.dto.auth.AuthResponse;
import com.nyaya.dto.auth.RefreshTokenRequest;
import com.nyaya.dto.auth.RegisterRequest;
import com.nyaya.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request,
                                              HttpServletRequest servletRequest) {
        AuthResponse response = authService.register(
                request,
                servletRequest.getRemoteAddr(),
                servletRequest.getHeader("User-Agent")
        );
        return ApiResponse.ok("Registration successful", response);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AuthRequest request,
                                           HttpServletRequest servletRequest) {
        AuthResponse response = authService.login(
                request,
                servletRequest.getRemoteAddr(),
                servletRequest.getHeader("User-Agent")
        );
        return ApiResponse.ok("Login successful", response);
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request,
                                             HttpServletRequest servletRequest) {
        AuthResponse response = authService.refreshToken(
                request,
                servletRequest.getRemoteAddr(),
                servletRequest.getHeader("User-Agent")
        );
        return ApiResponse.ok("Token refreshed", response);
    }
}

