package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.women.CreateWomenSupportCaseRequest;
import com.nyaya.dto.women.WomenSupportCaseDto;
import com.nyaya.service.WomenSupportService;
import com.nyaya.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/women-support")
@RequiredArgsConstructor
public class WomenSupportController {

    private final WomenSupportService womenSupportService;

    @PostMapping("/anonymous")
    public ApiResponse<WomenSupportCaseDto> createAnonymousCase(
            @Valid @RequestBody CreateWomenSupportCaseRequest request) {
        WomenSupportCaseDto dto = womenSupportService.createAnonymousCase(request);
        return ApiResponse.ok("Case created", dto);
    }

    @PostMapping("/users/me")
    public ApiResponse<WomenSupportCaseDto> createCaseForCurrentUser(
            @Valid @RequestBody CreateWomenSupportCaseRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();
        WomenSupportCaseDto dto = womenSupportService.createCaseForUser(userId, request);
        return ApiResponse.ok("Case created", dto);
    }
}

