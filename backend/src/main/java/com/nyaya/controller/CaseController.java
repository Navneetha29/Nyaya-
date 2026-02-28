package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.casefile.CaseDto;
import com.nyaya.dto.casefile.CreateCaseRequest;
import com.nyaya.service.CaseService;
import com.nyaya.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cases")
@RequiredArgsConstructor
public class CaseController {

    private final CaseService caseService;

    @PostMapping
    public ApiResponse<CaseDto> createCase(@Valid @RequestBody CreateCaseRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();
        CaseDto dto = caseService.createCase(userId, request);
        return ApiResponse.ok("Case created", dto);
    }

    @GetMapping
    public ApiResponse<List<CaseDto>> listMyCases() {
        UUID userId = SecurityUtils.getCurrentUserId();
        List<CaseDto> list = caseService.getCasesForUser(userId);
        return ApiResponse.ok(list);
    }

    @GetMapping("/{id}")
    public ApiResponse<CaseDto> getCase(@PathVariable UUID id) {
        CaseDto dto = caseService.getCase(id);
        return ApiResponse.ok(dto);
    }
}

