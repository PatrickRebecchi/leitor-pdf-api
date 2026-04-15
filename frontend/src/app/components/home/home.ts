import { Component, inject, OnInit, signal } from '@angular/core';
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
  ultimosPdfs = signal<Pdf[]>([]);
  erro = signal('');

  ngOnInit() {
    this.pdfService.listarUltimos().subscribe({
      next: (data) => {
        this.ultimosPdfs.set(data);
      },
      error: (err) => {
        console.error('Erro ao carregar PDFs:', err);
        this.erro.set('Erro ao carregar PDFs');
      }
    });
  }
}