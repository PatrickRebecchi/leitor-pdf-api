import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Pdf {
  id?: number;
  nome: string;
  link: string;
  dataCriacao: string;
  adicionadoPor: string;
}

export interface PdfRequest {
  nome: string;
  link: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pdfs`;

  listar(): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(this.apiUrl);
  }

  listarUltimos(limite: number = 6): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(`${this.apiUrl}/ultimos?limite=${limite}`);
  }

  salvar(pdf: PdfRequest): Observable<Pdf> {
    return this.http.post<Pdf>(this.apiUrl, pdf);
  }
}