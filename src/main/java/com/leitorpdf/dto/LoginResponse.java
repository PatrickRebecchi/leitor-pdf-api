package com.leitorpdf.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private String username;
    private String role;
    private String message;

    public LoginResponse(boolean success, String username, String role, String message) {
        this.success = success;
        this.username = username;
        this.role = role;
        this.message = message;
    }
}