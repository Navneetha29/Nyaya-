package com.nyaya.dto.women;

import com.nyaya.model.WomenSupportCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateWomenSupportCaseRequest {

    private boolean anonymous;

    private boolean emergency;

    @NotNull
    private WomenSupportCategory category;

    @NotBlank
    private String summary;

    /**
     * JSON string matching the structured question/answer format.
     */
    @NotBlank
    private String structuredQuestionResponses;
}

