package com.nyaya.controller;

import com.nyaya.dto.ApiResponse;
import com.nyaya.dto.notification.NotificationDto;
import com.nyaya.service.NotificationService;
import com.nyaya.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<List<NotificationDto>> listMyNotifications() {
        UUID userId = SecurityUtils.getCurrentUserId();
        List<NotificationDto> list = notificationService.listForUser(userId);
        return ApiResponse.ok(list);
    }

    @PostMapping("/{id}/read")
    public ApiResponse<Void> markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
        return ApiResponse.ok("Notification marked as read", null);
    }
}

