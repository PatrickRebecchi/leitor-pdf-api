package com.leitorpdf.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private Long userId;
    private String username;
    private String role;
    private String message;

    public LoginResponse(boolean success, Long userId, String username, String role, String message) {
        this.success = success;
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.message = message;
    }
}