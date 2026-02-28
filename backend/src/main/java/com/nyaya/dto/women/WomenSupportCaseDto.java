package com.nyaya.dto.women;

import com.nyaya.model.WomenSupportCategory;
import com.nyaya.model.WomenSupportStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class WomenSupportCaseDto {

    private UUID id;
    private UUID userId;
    private boolean anonymous;
    private boolean emergency;
    private WomenSupportCategory category;
    private WomenSupportStatus status;
    private String summary;
}

