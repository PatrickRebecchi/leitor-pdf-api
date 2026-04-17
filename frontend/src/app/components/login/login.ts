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

  email = signal('');
  password = signal('');
  erro = signal('');

  login() {
    this.erro.set('');
    
    this.authService.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.setSessao(response);
          this.router.navigate(['/home']);
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