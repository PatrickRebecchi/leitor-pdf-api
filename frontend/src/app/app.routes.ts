import { Routes } from '@angular/router';
import { AdicionarPdfComponent } from './components/adicionar-pdf/adicionar-pdf';
import { ListarPdfComponent } from './components/listar-pdf/listar-pdf';

export const routes: Routes = [
  { path: '', redirectTo: '/adicionar', pathMatch: 'full' },
  { path: 'adicionar', component: AdicionarPdfComponent },
  { path: 'listar', component: ListarPdfComponent }
];
