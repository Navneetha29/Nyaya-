package com.nyaya.firebase;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirebaseNotificationService {

    private final FirebaseMessaging firebaseMessaging;

    public String sendNotification(String fcmToken, String title, String body) {
        if (firebaseMessaging == null) {
            log.warn("FirebaseMessaging not configured. Skipping push notification.");
            return null;
        }
        if (!StringUtils.hasText(fcmToken)) {
            log.warn("Empty FCM token. Skipping push notification.");
            return null;
        }

        try {
            Message message = Message.builder()
                    .setToken(fcmToken)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .build();

            String messageId = firebaseMessaging.send(message);
            log.info("Sent Firebase notification with id {}", messageId);
            return messageId;
        } catch (Exception ex) {
            log.error("Failed to send Firebase notification: {}", ex.getMessage());
            return null;
        }
    }
}

