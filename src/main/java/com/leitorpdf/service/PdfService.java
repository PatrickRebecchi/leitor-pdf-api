package com.leitorpdf.service;

import com.leitorpdf.dto.PdfRequest;
import com.leitorpdf.model.Pdf;
import com.leitorpdf.repository.PdfRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PdfService {

    private final PdfRepository pdfRepository;

    public PdfService(PdfRepository pdfRepository) {
        this.pdfRepository = pdfRepository;
    }

    public Pdf criarPdf(PdfRequest request, String username) {
        Pdf pdf = new Pdf();
        pdf.setNome(request.getNome());
        pdf.setLink(request.getLink());
        pdf.setAdicionadoPor(username);
        pdf.setDataCriacao(LocalDateTime.now());
        
        return pdfRepository.save(pdf);
    }

    public List<Pdf> listarPdfs() {
        return pdfRepository.findAll();
    }

    public List<Pdf> listarUltimos(int limite) {
        return pdfRepository.findTop6ByOrderByDataCriacaoDesc();
    }
}