package com.leitorpdf.controller;

import com.leitorpdf.dto.PdfRequest;
import com.leitorpdf.model.Pdf;
import com.leitorpdf.service.PdfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pdfs")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping
    public ResponseEntity<Pdf> criarPdf(@RequestBody PdfRequest request) {
        String username = request.getUsername();
        Pdf pdf = pdfService.criarPdf(request, username);
        return ResponseEntity.ok(pdf);
    }

    @GetMapping
    public ResponseEntity<List<Pdf>> listarPdfs() {
        return ResponseEntity.ok(pdfService.listarPdfs());
    }

    @GetMapping("/ultimos")
    public ResponseEntity<List<Pdf>> listarUltimos() {
        return ResponseEntity.ok(pdfService.listarUltimos(6));
    }
}