import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../usuario/usuario.service';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {

  @Input() evento: Evento;

  userId: number;
  token: string;
  usuarioAdmin : boolean;

  constructor(
    private eventoService: EventoService,
    private toastr: ToastrService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.isAdmin();
  }

  isAdmin(): void {
    this.usuarioService.getUsuario(this.token, this.userId).subscribe(
      usuario => {
        this.usuarioAdmin = usuario.admin;
        console.log(this.usuarioAdmin)
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
  getCompetidor(id_competidor: any) {
    var competidor = this.evento.competidores.filter(x => x.id == id_competidor)[0]
    return competidor.nombre_competidor
  }

  goToEdit() {
    this.routerPath.navigate([`/eventos/editar/${this.evento.id}/${this.userId}/${this.token}`])
  }

  apostar() {
    this.routerPath.navigate([`/eventos/apostar/${this.evento.id}/${this.userId}/${this.token}`])
  }

  eliminarEvento() {
    this.eventoService.eliminarEvento(this.token, this.evento.id)
      .subscribe(() => {
        window.location.reload();
        this.showSuccess();
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
    this.ngOnInit()
  }

  terminarEvento() {
    this.routerPath.navigate([`/eventos/terminar/${this.evento.id}/${this.userId}/${this.token}`])
  }
  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La evento fue eliminada`, "Eliminada exitosamente");
  }
}
