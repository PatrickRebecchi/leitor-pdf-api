package com.leitorpdf.controller;

import com.leitorpdf.dto.PdfRequest;
import com.leitorpdf.model.Pdf;
import com.leitorpdf.repository.PdfRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pdfs")
@CrossOrigin(origins = "*")
public class PdfController {

    private final PdfRepository pdfRepository;

    public PdfController(PdfRepository pdfRepository) {
        this.pdfRepository = pdfRepository;
    }

    @PostMapping
    public ResponseEntity<Pdf> criarPdf(@RequestBody PdfRequest request) {
        Pdf pdf = new Pdf();
        pdf.setNome(request.getNome());
        pdf.setLink(request.getLink());
        pdf.setAdicionadoPor(request.getAdicionadoPor());
        pdf.setDataCriacao(LocalDateTime.now());
        
        Pdf salvo = pdfRepository.save(pdf);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Pdf>> listarPdfs() {
        return ResponseEntity.ok(pdfRepository.findAll());
    }
}
