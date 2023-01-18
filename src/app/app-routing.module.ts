import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApuestaCreateComponent } from './apuesta/apuesta-create/apuesta-create.component';
import { ApuestaEditComponent } from './apuesta/apuesta-edit/apuesta-edit.component';
import { ApuestaListComponent } from './apuesta/apuesta-list/apuesta-list.component';
import { EventoCreateComponent } from './evento/evento-create/evento-create.component';
import { EventoEditComponent } from './evento/evento-edit/evento-edit.component';
import { EventoFinishComponent } from './evento/evento-finish/evento-finish.component';
import { EventoListComponent } from './evento/evento-list/evento-list.component';
import { EventoReportComponent } from './evento/evento-report/evento-report.component';
import { UsuarioCarteraComponent } from './usuario/usuario-cartera/usuario-cartera.component';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'eventos/:userId/:userToken',
    component: EventoListComponent
  },
  {
    path: 'eventos/crear/:userId/:userToken',
    component: EventoCreateComponent
  },
  {
    path: 'eventos/editar/:eventoId/:userId/:userToken',
    component: EventoEditComponent
  },
  {
    path: 'eventos/terminar/:eventoId/:userId/:userToken',
    component: EventoFinishComponent
  },
  {
    path: 'eventos/reporte/:eventoId/:userId/:userToken',
    component: EventoReportComponent
  },
  {
    path: 'apuestas/:userId/:userToken',
    component: ApuestaListComponent
  },
  {
    path: 'apuestas/crear/:userId/:userToken',
    component: ApuestaCreateComponent
  },
  {
    path: 'apuestas/editar/:apuestaId/:userId/:userToken',
    component: ApuestaEditComponent
  },
  {
    path: 'cartera/:userId/:userToken',
    component: UsuarioCarteraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
