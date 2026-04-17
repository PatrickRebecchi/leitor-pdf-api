import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  protected menuAberto = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  toggleMenu() {
    this.menuAberto.update(v => !v);
  }

  fecharMenu() {
    this.menuAberto.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  estaLogado(): boolean {
    return this.authService.estaLogado();
  }
}

  toggleMenu() {
    this.menuAberto.update(v => !v);
  }

  fecharMenu() {
    this.menuAberto.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  estaLogado(): boolean {
    return this.authService.estaLogado();
  }
}
