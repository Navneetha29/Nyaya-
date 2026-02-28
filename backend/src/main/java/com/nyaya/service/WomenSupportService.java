package com.nyaya.service;

import com.nyaya.ai.AiService;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.dto.women.CreateWomenSupportCaseRequest;
import com.nyaya.dto.women.WomenSupportCaseDto;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.User;
import com.nyaya.model.WomenSupportCase;
import com.nyaya.repository.UserRepository;
import com.nyaya.repository.WomenSupportCaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WomenSupportService {

    private final WomenSupportCaseRepository womenSupportCaseRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    @Transactional
    public WomenSupportCaseDto createAnonymousCase(CreateWomenSupportCaseRequest request) {
        WomenSupportCase womenCase = new WomenSupportCase();
        womenCase.setAnonymous(true);
        womenCase.setEmergency(request.isEmergency());
        womenCase.setCategory(request.getCategory());
        womenCase.setSummary(request.getSummary());
        womenCase.setStructuredQuestionResponses(request.getStructuredQuestionResponses());

        womenCase = womenSupportCaseRepository.save(womenCase);

        AiResponseDto summary = aiService.generateWomenSupportLegalSummary(womenCase);
        if (summary.getSummary() != null) {
            womenCase.setSummary(summary.getSummary());
            womenCase = womenSupportCaseRepository.save(womenCase);
        }

        return toDto(womenCase);
    }

    @Transactional
    public WomenSupportCaseDto createCaseForUser(UUID userId, CreateWomenSupportCaseRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        WomenSupportCase womenCase = new WomenSupportCase();
        womenCase.setUser(user);
        womenCase.setAnonymous(request.isAnonymous());
        womenCase.setEmergency(request.isEmergency());
        womenCase.setCategory(request.getCategory());
        womenCase.setSummary(request.getSummary());
        womenCase.setStructuredQuestionResponses(request.getStructuredQuestionResponses());

        womenCase = womenSupportCaseRepository.save(womenCase);

        AiResponseDto summary = aiService.generateWomenSupportLegalSummary(womenCase);
        if (summary.getSummary() != null) {
            womenCase.setSummary(summary.getSummary());
            womenCase = womenSupportCaseRepository.save(womenCase);
        }

        return toDto(womenCase);
    }

    private WomenSupportCaseDto toDto(WomenSupportCase womenCase) {
        return WomenSupportCaseDto.builder()
                .id(womenCase.getId())
                .userId(womenCase.getUser() != null ? womenCase.getUser().getId() : null)
                .anonymous(womenCase.isAnonymous())
                .emergency(womenCase.isEmergency())
                .category(womenCase.getCategory())
                .status(womenCase.getStatus())
                .summary(womenCase.getSummary())
                .build();
    }
}

