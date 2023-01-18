import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      admin: [false, [Validators.maxLength(50), Validators.minLength(4)]]
    })
  }

  registrarUsuario() {
    this.usuarioService.userSignUp(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('admin')?.value)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/eventos/${decodedToken.sub}/${res.token}`])
        this.showSuccess()
      },
        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`)
        })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, "Registro exitoso");
  }

}
