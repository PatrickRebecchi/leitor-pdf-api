import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PdfService } from '../../services/pdf';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-adicionar-pdf',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './adicionar-pdf.html',
  styleUrl: './adicionar-pdf.css',
})
export class AdicionarPdfComponent {
  private pdfService = inject(PdfService);
  private authService = inject(AuthService);
  private router = inject(Router);

  nome = signal('');
  link = signal('');
  sucesso = signal(false);

  getUsuario(): string {
    return this.authService.getUsuario() || '';
  }

  salvar() {
    if (this.nome() && this.link()) {
      this.pdfService.salvar({
        nome: this.nome(),
        link: this.link(),
        username: this.getUsuario()
      }).subscribe(() => {
        this.nome.set('');
        this.link.set('');
        this.sucesso.set(true);
        setTimeout(() => {
          this.router.navigate(['/listar']);
        }, 1500);
      });
    }
  }
}