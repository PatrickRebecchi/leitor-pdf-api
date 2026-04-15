import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PdfService } from '../../services/pdf';

@Component({
  selector: 'app-adicionar-pdf',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './adicionar-pdf.html',
  styleUrl: './adicionar-pdf.css',
})
export class AdicionarPdfComponent {
  private pdfService = inject(PdfService);
  private router = inject(Router);

  nome = '';
  link = '';
  adicionadoPor = '';

  salvar() {
    if (this.nome && this.link && this.adicionadoPor) {
      this.pdfService.salvar({
        nome: this.nome,
        link: this.link,
        adicionadoPor: this.adicionadoPor
      }).subscribe(() => {
        this.nome = '';
        this.link = '';
        this.adicionadoPor = '';
        this.router.navigate(['/']);
      });
    }
  }
}
