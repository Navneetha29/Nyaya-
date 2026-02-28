package com.nyaya.service;

import com.nyaya.ai.AiService;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.dto.casefile.CaseDto;
import com.nyaya.dto.casefile.CreateCaseRequest;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.Case;
import com.nyaya.model.User;
import com.nyaya.repository.CaseRepository;
import com.nyaya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseService {

    private final CaseRepository caseRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    @Transactional
    public CaseDto createCase(UUID userId, CreateCaseRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Case legalCase = new Case();
        legalCase.setUser(user);
        legalCase.setTitle(request.getTitle());
        legalCase.setDescription(request.getDescription());
        legalCase.setWomenRelated(request.isWomenRelated());

        legalCase = caseRepository.save(legalCase);

        AiResponseDto insights = aiService.generateCaseInsights(legalCase);
        if (insights.getSummary() != null) {
            legalCase.setAiInsights(insights.getSummary());
            legalCase = caseRepository.save(legalCase);
        }

        return toDto(legalCase);
    }

    @Transactional(readOnly = true)
    public List<CaseDto> getCasesForUser(UUID userId) {
        return caseRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CaseDto getCase(UUID caseId) {
        Case legalCase = caseRepository.findById(caseId)
                .orElseThrow(() -> new NotFoundException("Case not found"));
        return toDto(legalCase);
    }

    private CaseDto toDto(Case legalCase) {
        UUID lawyerId = legalCase.getAssignedLawyer() != null ? legalCase.getAssignedLawyer().getId() : null;
        return CaseDto.builder()
                .id(legalCase.getId())
                .userId(legalCase.getUser().getId())
                .assignedLawyerId(lawyerId)
                .title(legalCase.getTitle())
                .description(legalCase.getDescription())
                .status(legalCase.getStatus())
                .womenRelated(legalCase.isWomenRelated())
                .build();
    }
}

