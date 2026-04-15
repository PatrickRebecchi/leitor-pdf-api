import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pdf {
  id?: number;
  nome: string;
  link: string;
  dataCriacao: string;
  adicionadoPor: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pdfs';

  listar(): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(this.apiUrl);
  }

  listarUltimos(limite: number = 6): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(`${this.apiUrl}/ultimos?limite=${limite}`);
  }

  salvar(pdf: Omit<Pdf, 'id' | 'dataCriacao'>): Observable<Pdf> {
    return this.http.post<Pdf>(this.apiUrl, pdf);
  }
}
