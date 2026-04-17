package com.leitorpdf.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private Long userId;
    private String nome;
    private String role;
    private String message;

    public LoginResponse(boolean success, Long userId, String nome, String role, String message) {
        this.success = success;
        this.userId = userId;
        this.nome = nome;
        this.role = role;
        this.message = message;
    }
}