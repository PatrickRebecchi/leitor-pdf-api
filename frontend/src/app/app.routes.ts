import { Routes } from '@angular/router';
import { AdicionarPdfComponent } from './components/adicionar-pdf/adicionar-pdf';
import { ListarPdfComponent } from './components/listar-pdf/listar-pdf';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adicionar', component: AdicionarPdfComponent },
  { path: 'listar', component: ListarPdfComponent }
];