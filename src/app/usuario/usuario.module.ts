import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { UsuarioCarteraComponent } from './usuario-cartera/usuario-cartera.component';
import { AppHeaderModule } from '../app-header/app-header.module';

@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioSignupComponent, UsuarioCarteraComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule
  ],
  exports: [UsuarioLoginComponent, UsuarioSignupComponent, UsuarioCarteraComponent]
})
export class UsuarioModule { }
