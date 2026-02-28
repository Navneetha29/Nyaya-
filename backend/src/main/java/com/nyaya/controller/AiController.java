package com.nyaya.controller;

import com.nyaya.ai.AiService;
import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.dto.ai.PetitionDraftRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/petition-draft")
    public ApiResponse<AiResponseDto> generatePetitionDraft(@Valid @RequestBody PetitionDraftRequest request) {
        AiResponseDto dto = aiService.generatePetitionDraft(request.getContext());
        return ApiResponse.ok("AI response generated", dto);
    }
}

