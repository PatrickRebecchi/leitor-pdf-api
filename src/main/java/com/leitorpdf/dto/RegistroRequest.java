package com.leitorpdf.dto;

import lombok.Data;

@Data
public class RegistroRequest {
    private String email;
    private String nome;
    private String password;
}