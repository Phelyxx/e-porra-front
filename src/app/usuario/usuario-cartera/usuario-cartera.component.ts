import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-cartera',
  templateUrl: './usuario-cartera.component.html',
  styleUrls: ['./usuario-cartera.component.css']
})
export class UsuarioCarteraComponent implements OnInit {

  helper = new JwtHelperService();
  @Input() usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private routerPath: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  userId: number
  token: string
  dinero: number
  dineroForm: FormGroup

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getMoney();
      this.dineroForm = this.formBuilder.group({
        dinero: [0, [Validators.required, Validators.min(0)]]
      })
    }
  }

  getMoney(): void {
    this.usuarioService.getUsuario(this.token, this.userId).subscribe(
        usuario => {
          this.usuario = new Usuario(usuario.id, "",usuario.dinero,usuario.usuario, [], usuario.contrasena, usuario.eventos);
          this.dinero = usuario.dinero
          console.log(this.dinero)
        },
        error => {
          console.log(error)
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        }
      );
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }
  showSuccess(usuario: Usuario) {
    this.toastr.success(`La transacción fue creada`, "Creación exitosa");
  }

  agregarDinero(newCartera: Usuario){

    if(newCartera.dinero >= 0){

      this.dinero = this.dinero + newCartera.dinero;
      this.usuario.dinero = this.dinero;
      this.usuarioService.setDinero(this.token, this.userId, this.usuario).subscribe(
          usuario => {
            this.dinero = usuario.dinero
            this.showSuccess(usuario)
            this.dineroForm.reset()
          },
          error => {
            console.log(error)
            if (error.statusText === "UNAUTHORIZED") {
              this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
            }
            else if (error.statusText === "UNPROCESSABLE ENTITY") {
              this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
            }
            else {
              this.showError("Ha ocurrido un error. " + error.message)
            }
          }
        );
    } else {
      this.showError("El monto debe ser positivo. ")
    }
  }

  retirarDinero(newCartera: Usuario){

    if(newCartera.dinero >= 0){
      if(this.dinero - newCartera.dinero >= 0){
        this.dinero = this.dinero - newCartera.dinero;
        this.usuario.dinero = this.dinero;
        this.usuarioService.setDinero(this.token, this.userId, this.usuario).subscribe(
            usuario => {
              this.dinero = usuario.dinero
              this.showSuccess(usuario)
              this.dineroForm.reset()
            },
            error => {
              console.log(error)
              if (error.statusText === "UNAUTHORIZED") {
                this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
              }
              else if (error.statusText === "UNPROCESSABLE ENTITY") {
                this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
              }
              else {
                this.showError("Ha ocurrido un error. " + error.message)
              }
            }
          );
      } else {
        this.showError("No se puede retirar dicha cantidad.")  
      }
    } else {
      this.showError("El monto debe ser positivo.")
    }
  }

}
