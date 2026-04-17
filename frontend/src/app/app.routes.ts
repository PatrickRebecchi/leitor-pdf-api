import { Routes } from '@angular/router';
import { AdicionarPdfComponent } from './components/adicionar-pdf/adicionar-pdf';
import { ListarPdfComponent } from './components/listar-pdf/listar-pdf';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { CadastrarComponent } from './components/cadastrar/cadastrar';
import { InicioComponent } from './components/inicio/inicio';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'adicionar', component: AdicionarPdfComponent, canActivate: [authGuard] },
  { path: 'listar', component: ListarPdfComponent, canActivate: [authGuard] }
];