import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PdfService, Pdf } from '../../services/pdf';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private pdfService = inject(PdfService);
  ultimosPdfs = signal<Pdf[]>([]);
  pdfsBuscados = signal<Pdf[]>([]);
  termoBusca = signal('');
  erro = signal('');
  buscando = signal(false);

  ngOnInit() {
    this.carregarUltimos();
  }

  carregarUltimos() {
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

  buscar() {
  const value = this.termoBusca();

  if (!value || value.trim().length === 0) {
    this.pdfsBuscados.set([]);
    this.carregarUltimos();
    return;
  }

  this.buscando.set(true);

  this.pdfService.buscar(value).subscribe({
    next: (data) => {
      this.pdfsBuscados.set(data);
      this.buscando.set(false);
    },
    error: (err) => {
      console.error('Erro ao buscar PDFs:', err);
      this.erro.set('Erro ao buscar PDFs');
      this.buscando.set(false);
    }
  });
}

  get pdfsExibir(): Pdf[] {
    if (this.termoBusca().trim().length > 0) {
      return this.pdfsBuscados();
    }
    return this.ultimosPdfs();
  }
}
