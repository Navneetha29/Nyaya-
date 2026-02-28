package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.lawyer.LawyerDto;
import com.nyaya.service.LawyerService;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final LawyerService lawyerService;

    @PatchMapping("/lawyers/{id}/verify")
    public ApiResponse<LawyerDto> verifyLawyer(@PathVariable UUID id, @RequestBody VerifyRequest request) {
        LawyerDto dto = lawyerService.verifyLawyer(id, request.isVerified());
        return ApiResponse.ok("Lawyer verification updated", dto);
    }

    @Data
    public static class VerifyRequest {
        @NotNull
        private Boolean verified;
    }
}

