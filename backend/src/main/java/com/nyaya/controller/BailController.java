package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.bail.BailRequestDto;
import com.nyaya.dto.bail.CreateBailRequest;
import com.nyaya.service.BailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bail")
@RequiredArgsConstructor
public class BailController {

    private final BailService bailService;

    @PostMapping("/cases/{caseId}")
    public ApiResponse<BailRequestDto> createBailRequest(@PathVariable UUID caseId,
                                                         @Valid @RequestBody CreateBailRequest request) {
        BailRequestDto dto = bailService.createBailRequest(caseId, request);
        return ApiResponse.ok("Bail request created", dto);
    }
}

