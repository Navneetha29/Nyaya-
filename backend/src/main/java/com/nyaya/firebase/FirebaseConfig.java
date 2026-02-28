package com.nyaya.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Slf4j
@Configuration
public class FirebaseConfig {

    @Value("${nyaya.firebase.service-account-file:}")
    private String serviceAccountFile;

    @Bean
    public FirebaseApp firebaseApp() {
        if (serviceAccountFile == null || serviceAccountFile.isBlank()) {
            log.warn("Firebase service account file not configured. Firebase features will be disabled.");
            return null;
        }
        try (FileInputStream serviceAccount = new FileInputStream(serviceAccountFile)) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            List<FirebaseApp> apps = FirebaseApp.getApps();
            if (apps != null && !apps.isEmpty()) {
                for (FirebaseApp app : apps) {
                    if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                        return app;
                    }
                }
            }
            return FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            log.error("Failed to initialize FirebaseApp: {}", e.getMessage());
            return null;
        }
    }

    @Bean
    public FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
        if (firebaseApp == null) {
            return null;
        }
        return FirebaseMessaging.getInstance(firebaseApp);
    }
}

