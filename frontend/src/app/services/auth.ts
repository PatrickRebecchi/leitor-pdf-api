import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  username: string;
  role: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  estaLogado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
  }

  setSessao(response: LoginResponse): void {
    localStorage.setItem('usuario', response.username);
    localStorage.setItem('role', response.role);
  }
}