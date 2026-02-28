package com.nyaya.service;

import com.nyaya.ai.AiService;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.dto.bail.BailRequestDto;
import com.nyaya.dto.bail.CreateBailRequest;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.BailRequest;
import com.nyaya.model.Case;
import com.nyaya.repository.BailRequestRepository;
import com.nyaya.repository.CaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BailService {

    private final BailRequestRepository bailRequestRepository;
    private final CaseRepository caseRepository;
    private final AiService aiService;

    @Transactional
    public BailRequestDto createBailRequest(UUID caseId, CreateBailRequest request) {
        Case legalCase = caseRepository.findById(caseId)
                .orElseThrow(() -> new NotFoundException("Case not found"));

        BailRequest bailRequest = new BailRequest();
        bailRequest.setLegalCase(legalCase);
        bailRequest.setCourtName(request.getCourtName());
        bailRequest.setHearingDate(request.getHearingDate());

        bailRequest = bailRequestRepository.save(bailRequest);

        AiResponseDto summary = aiService.generateBailEligibilitySummary(bailRequest);
        if (summary.getSummary() != null) {
            bailRequest.setAiSummary(summary.getSummary());
            bailRequest = bailRequestRepository.save(bailRequest);
        }

        return toDto(bailRequest);
    }

    @Transactional(readOnly = true)
    public BailRequestDto getById(UUID id) {
        BailRequest br = bailRequestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Bail request not found"));
        return toDto(br);
    }

    private BailRequestDto toDto(BailRequest br) {
        return BailRequestDto.builder()
                .id(br.getId())
                .caseId(br.getLegalCase().getId())
                .status(br.getStatus())
                .courtName(br.getCourtName())
                .hearingDate(br.getHearingDate())
                .build();
    }
}

