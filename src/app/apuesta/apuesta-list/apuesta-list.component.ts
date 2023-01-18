import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/evento/evento.service';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';


@Component({
  selector: 'app-apuesta-list',
  templateUrl: './apuesta-list.component.html',
  styleUrls: ['./apuesta-list.component.css']
})
export class ApuestaListComponent implements OnInit {

  constructor(
    private apuestaService: ApuestaService,
    private eventoService: EventoService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  apuestas: Array<Apuesta>
  mostrarApuestas: Array<Apuesta>
  apuestaSeleccionada: Apuesta
  indiceSeleccionado: number = 0
  nombreEvento: string
  nombreCompetidor: string


  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getApuestas();
    }
  }

  getApuestas(): void {
    this.apuestaService.getApuestas(this.token)
      .subscribe(apuestas => {
        this.apuestas = apuestas
        this.mostrarApuestas = apuestas
        this.onSelect(this.mostrarApuestas[0], 0)
      })
  }

  onSelect(apuesta: Apuesta, indice: number) {
    if (apuesta != null) {
      this.indiceSeleccionado = indice
      this.apuestaSeleccionada = apuesta
      this.getInfo()
    }
  }

  getInfo(): void {
    this.eventoService.getEvento(this.apuestaSeleccionada.id_evento, this.token)
      .subscribe(evento => {
        this.nombreEvento = evento.nombre
        var competidor = evento.competidores.filter(x => x.id == this.apuestaSeleccionada.id_competidor)[0]
        this.nombreCompetidor = competidor.nombre_competidor
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

  buscarApuesta(busqueda: string) {
    let apuestasBusqueda: Array<Apuesta> = []
    this.apuestas.map(apuesta => {
      if (apuesta.nombre_apostador.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())) {
        apuestasBusqueda.push(apuesta)
      }
    })
    this.mostrarApuestas = apuestasBusqueda
  }

  irCrearApuesta() {
    this.routerPath.navigate([`/apuestas/crear/${this.userId}/${this.token}`])
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La apuesta fue eliminada`, "Eliminada exitosamente");
  }

}
