import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Evento, Competidor } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-finish',
  templateUrl: './evento-finish.component.html',
  styleUrls: ['./evento-finish.component.css']
})

export class EventoFinishComponent implements OnInit {

  evento: Evento;
  userId: number;
  token: string;
  competidores: Array<Competidor>
  competidorGanador: Competidor
  competidorGanadorForm!: FormGroup;

  constructor(
    private eventoService: EventoService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private routerPath: Router) { }

  ngOnInit(): void {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken

      this.competidorGanadorForm = this.formBuilder.group({
        id_competidor: ["", [Validators.required]]
      });

      this.eventoService.getEvento(parseInt(this.router.snapshot.params.eventoId), this.token)
        .subscribe(eventoEncontrada => {
          this.evento = eventoEncontrada
          this.competidores = eventoEncontrada.competidores
        })
    }
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  backToDetails() {
    this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
  }

  terminarEvento(form: any) {
    this.eventoService.actualizarGanador(this.token, form.id_competidor)
      .subscribe(competidor => {
        this.competidorGanador = competidor
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

    this.routerPath.navigate([`eventos/reporte/${this.evento.id}/${this.userId}/${this.token}`])
  }
}
