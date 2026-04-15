import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PdfService, Pdf } from '../../services/pdf';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private pdfService = inject(PdfService);
  ultimosPdfs: Pdf[] = [];

  ngOnInit() {
    this.pdfService.listarUltimos().subscribe((data) => {
      this.ultimosPdfs = data;
    });
  }
}