import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento, Competidor } from 'src/app/evento/evento';
import { EventoService } from 'src/app/evento/evento.service';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';

@Component({
  selector: 'app-apuesta-create',
  templateUrl: './apuesta-create.component.html',
  styleUrls: ['./apuesta-create.component.css']
})
export class ApuestaCreateComponent implements OnInit {

  userId: number
  token: string
  apuestaForm: FormGroup
  eventos: Array<Evento>
  competidores: Array<Competidor>

  constructor(
    private apuestaService: ApuestaService,
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apuestaForm = this.formBuilder.group({
        id_evento: ["", [Validators.required]],
        id_competidor: ["", [Validators.required]],
        nombre_apostador: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
        valor_apostado: [0, [Validators.required]]
      })
      this.getEventos()
    }
  }

  onEventoSelect(event: any): void {
    if (event != null && event != "") {
      var eventoSeleccionada = this.eventos.filter(x => x.id == event)[0]
      this.competidores = eventoSeleccionada.competidores
    }
  }

  getEventos(): void {
    this.eventoService.getEventos(this.userId, this.token)
      .subscribe(eventos => {
        this.eventos = eventos
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
        })

  }

  createApuesta(newApuesta: Apuesta) {
    this.apuestaService.crearApuesta(newApuesta, this.token)
      .subscribe(apuesta => {
        this.showSuccess(apuesta)
        this.apuestaForm.reset()
        this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  cancelCreate() {
    this.apuestaForm.reset()
    this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apuesta: Apuesta) {
    this.toastr.success(`La apuesta fue creada`, "Creación exitosa");
  }


}
