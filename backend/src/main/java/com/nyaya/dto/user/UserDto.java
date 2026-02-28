package com.nyaya.dto.user;

import com.nyaya.model.Role;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDto {

    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
    private boolean active;
}

