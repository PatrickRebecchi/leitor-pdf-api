package com.leitorpdf.repository;

import com.leitorpdf.model.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PdfRepository extends JpaRepository<Pdf, Long> {
    List<Pdf> findTop6ByOrderByDataCriacaoDesc();
    List<Pdf> findByNomeContainingIgnoreCaseOrAdicionadoPorContainingIgnoreCase(String nome, String adicionadoPor);
}
