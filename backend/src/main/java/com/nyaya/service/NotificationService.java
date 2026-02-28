package com.nyaya.service;

import com.nyaya.dto.notification.NotificationDto;
import com.nyaya.exception.NotFoundException;
import com.nyaya.firebase.FirebaseNotificationService;
import com.nyaya.model.Notification;
import com.nyaya.model.NotificationChannel;
import com.nyaya.model.NotificationType;
import com.nyaya.model.User;
import com.nyaya.repository.NotificationRepository;
import com.nyaya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final FirebaseNotificationService firebaseNotificationService;

    @Transactional
    public NotificationDto sendNotificationToUser(UUID userId,
                                                  NotificationType type,
                                                  String title,
                                                  String body,
                                                  boolean push) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setChannel(NotificationChannel.IN_APP);
        notification.setTitle(title);
        notification.setBody(body);

        if (push) {
            String messageId = firebaseNotificationService.sendNotification(user.getFcmToken(), title, body);
            notification.setChannel(NotificationChannel.PUSH);
            notification.setFcmMessageId(messageId);
        }

        notification = notificationRepository.save(notification);
        return toDto(notification);
    }

    @Transactional(readOnly = true)
    public List<NotificationDto> listForUser(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    private NotificationDto toDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .type(n.getType())
                .channel(n.getChannel())
                .title(n.getTitle())
                .body(n.getBody())
                .read(n.isRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}

