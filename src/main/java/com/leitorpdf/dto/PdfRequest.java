package com.leitorpdf.dto;

import lombok.Data;

@Data
public class PdfRequest {
    private String nome;
    private String link;
    private String adicionadoPor;
}
