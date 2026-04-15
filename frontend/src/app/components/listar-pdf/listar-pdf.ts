import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService, Pdf } from '../../services/pdf';

@Component({
  selector: 'app-listar-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-pdf.html',
  styleUrl: './listar-pdf.css',
})
export class ListarPdfComponent implements OnInit {
  private pdfService = inject(PdfService);
  pdfs: Pdf[] = [];

  ngOnInit() {
    this.pdfService.listar().subscribe((data) => {
      this.pdfs = data;
    });
  }
}
