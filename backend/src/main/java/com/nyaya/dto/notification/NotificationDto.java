package com.nyaya.dto.notification;

import com.nyaya.model.NotificationChannel;
import com.nyaya.model.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
public class NotificationDto {

    private UUID id;
    private NotificationType type;
    private NotificationChannel channel;
    private String title;
    private String body;
    private boolean read;
    private OffsetDateTime createdAt;
}

