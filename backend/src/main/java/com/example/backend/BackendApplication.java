package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.example.backend", "com.example.backend.controller", "com.example.backend.service", "com.example.backend.security", "com.example.backend.config",
        "com.example.backend.exception"})
@EntityScan(basePackages = {"com.example.backend.entity"})
@EnableJpaRepositories(basePackages = {"com.example.backend.repository"})
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}