import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Evento } from '../evento';
import { EventoService } from '../evento.service';
import { UsuarioService  } from '../../usuario/usuario.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }
  usuarioAdmin : boolean
  userId: number
  token: string
  eventos: Array<Evento>
  mostrarEventos: Array<Evento>
  eventoSeleccionada: Evento
  indiceSeleccionado: number

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.isAdmin();
      this.getEventos();
    }
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

  getEventos(): void {
    this.eventoService.getEventos(this.userId, this.token)
      .subscribe(eventos => {
        this.eventos = eventos
        this.mostrarEventos = eventos
        if (eventos.length > 0) {
          this.onSelect(this.mostrarEventos[0], 0)
        }
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

  onSelect(a: Evento, index: number) {
    this.indiceSeleccionado = index
    this.eventoSeleccionada = a
  }

  buscarEvento(busqueda: string) {
    let eventosBusqueda: Array<Evento> = []
    this.eventos.map(evento => {
      if (evento.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) {
        eventosBusqueda.push(evento)
      }
    })
    this.mostrarEventos = eventosBusqueda
  }

  irCrearEvento() {
    this.routerPath.navigate([`/eventos/crear/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }
}
