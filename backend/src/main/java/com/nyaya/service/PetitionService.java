package com.nyaya.service;

import com.nyaya.ai.AiService;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.dto.petition.CreatePetitionRequest;
import com.nyaya.dto.petition.PetitionDto;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.Case;
import com.nyaya.model.Petition;
import com.nyaya.repository.CaseRepository;
import com.nyaya.repository.PetitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PetitionService {

    private final PetitionRepository petitionRepository;
    private final CaseRepository caseRepository;
    private final AiService aiService;

    @Transactional
    public PetitionDto createPetition(UUID caseId, CreatePetitionRequest request) {
        Case legalCase = caseRepository.findById(caseId)
                .orElseThrow(() -> new NotFoundException("Case not found"));

        Petition petition = new Petition();
        petition.setLegalCase(legalCase);
        petition.setType(request.getType());
        petition.setContent(request.getContent());

        petition = petitionRepository.save(petition);

        AiResponseDto draft = aiService.generatePetitionDraft(request.getContent());
        if (draft.getSummary() != null) {
            petition.setAiDraft(draft.getSummary());
            petition = petitionRepository.save(petition);
        }

        return toDto(petition);
    }

    private PetitionDto toDto(Petition petition) {
        return PetitionDto.builder()
                .id(petition.getId())
                .caseId(petition.getLegalCase().getId())
                .type(petition.getType())
                .content(petition.getContent())
                .build();
    }
}

