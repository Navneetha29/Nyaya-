package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.lawyer.LawyerDto;
import com.nyaya.service.LawyerService;
import com.nyaya.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/lawyers")
@RequiredArgsConstructor
public class LawyerController {

    private final LawyerService lawyerService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('LAWYER')")
    public ApiResponse<LawyerDto> getMyProfile() {
        UUID userId = SecurityUtils.getCurrentUserId();
        LawyerDto dto = lawyerService.getByUserId(userId);
        return ApiResponse.ok(dto);
    }

    @GetMapping("/verified")
    public ApiResponse<List<LawyerDto>> getVerifiedLawyers() {
        List<LawyerDto> list = lawyerService.getVerifiedLawyers();
        return ApiResponse.ok(list);
    }
}

