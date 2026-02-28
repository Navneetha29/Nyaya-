package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.user.UpdateUserRequest;
import com.nyaya.dto.user.UserDto;
import com.nyaya.service.UserService;
import com.nyaya.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserDto> getCurrentUser() {
        UUID userId = SecurityUtils.getCurrentUserId();
        UserDto dto = userService.getCurrentUser(userId);
        return ApiResponse.ok(dto);
    }

    @PatchMapping("/me")
    public ApiResponse<UserDto> updateCurrentUser(@Valid @RequestBody UpdateUserRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();
        UserDto dto = userService.updateCurrentUser(userId, request);
        return ApiResponse.ok("Profile updated", dto);
    }
}

