import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css'
})
export class CadastrarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  nome = signal('');
  password = signal('');
  erro = signal('');
  sucesso = signal(false);

  cadastrar() {
    this.erro.set('');
    
    this.authService.registro({
      email: this.email(),
      nome: this.nome(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.sucesso.set(true);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.erro.set(response.message);
        }
      },
      error: () => {
        this.erro.set('Erro ao conectar com o servidor');
      }
    });
  }
}