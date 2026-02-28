package com.nyaya.ai;

import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.model.BailRequest;
import com.nyaya.model.Case;
import com.nyaya.model.WomenSupportCase;

public interface AiService {

    AiResponseDto generateCaseInsights(Case legalCase);

    AiResponseDto generateBailEligibilitySummary(BailRequest bailRequest);

    AiResponseDto generatePetitionDraft(String petitionContext);

    AiResponseDto generateWomenSupportLegalSummary(WomenSupportCase womenSupportCase);
}

