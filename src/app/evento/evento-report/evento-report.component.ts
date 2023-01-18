import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Apuesta, Evento, Competidor } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-report',
  templateUrl: './evento-report.component.html',
  styleUrls: ['./evento-report.component.css']
})

export class EventoReportComponent implements OnInit {

  evento: Evento;
  userId: number;
  token: string;
  gananciaCasa: number;

  constructor(
    private eventoService: EventoService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router) { }

  ngOnInit(): void {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.eventoService.verReporteEvento(this.token, parseInt(this.router.snapshot.params.eventoId))
        .subscribe(reporteEvento => {
          this.evento = new Evento(reporteEvento.evento.id, reporteEvento.evento.nombre, reporteEvento.evento.deporte, reporteEvento.evento.tipo, reporteEvento.evento.abierto, this.userId, [], [])

          if (reporteEvento.evento.competidores.length > 0) {
            for (let competidor of reporteEvento.evento.competidores) {
              this.evento.competidores.push(new Competidor(competidor.id, competidor.nombre_competidor, competidor.probabilidad));
            }
          }

          if (reporteEvento.evento.apuestas.length > 0) {
            for (let apuesta of reporteEvento.evento.apuestas) {
              this.evento.apuestas.push(new Apuesta(apuesta.id, apuesta.valor_apostado, apuesta.ganancia, apuesta.nombre_apostador, apuesta.id_competidor, apuesta.id_evento));
            }
          }

          if (reporteEvento.ganancia_casa === undefined) {
            this.gananciaCasa = 0
          } else {
            this.gananciaCasa = parseFloat(reporteEvento.ganancia_casa)
          }

        })
    }
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(evento: Evento) {
    this.toastr.success(`La evento ${evento.nombre} fue editada`, "Edición exitosa");
  }

  backToDetails() {
    this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
  }

}
