import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  erro = signal('');
  sucesso = signal('');
  modoRegistro = signal(false);

  toggleModo() {
    this.modoRegistro.update(v => !v);
    this.erro.set('');
    this.sucesso.set('');
  }

  login() {
    this.erro.set('');
    
    this.authService.login({
      username: this.username(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.setSessao(response);
          this.router.navigate(['/listar']);
        } else {
          this.erro.set(response.message);
        }
      },
      error: () => {
        this.erro.set('Erro ao conectar com o servidor');
      }
    });
  }

  registro() {
    this.erro.set('');
    this.sucesso.set('');
    
    this.authService.registro({
      username: this.username(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.sucesso.set(response.message);
          this.modoRegistro.set(false);
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