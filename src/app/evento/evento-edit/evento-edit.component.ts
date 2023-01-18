import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {

  userId: number;
  token: string;
  eventoId: number;
  eventoForm!: FormGroup;

  constructor(

    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.eventoService.getEvento(parseInt(this.router.snapshot.params.eventoId), this.token)
        .subscribe(evento => {
          this.eventoId = evento.id
          this.eventoForm = this.formBuilder.group({
            nombre: [evento.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            deporte: [evento.deporte, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            tipo: [evento.tipo.llave, [Validators.required]],
            competidores: new FormArray([])
          })

          if (evento.competidores.length > 0) {
            evento.competidores.forEach((item, index) => {
              this.competidorformArray.push(this.createCompetidorForm(item));
            });
          }
        })
    }
  }

  get eventoFormControls() {
    return this.eventoForm.controls;
  }

  get competidorformArray() {
    return this.eventoFormControls.competidores as FormArray;
  }

  private createCompetidorForm(item?: any): FormGroup {
    return this.formBuilder.group({
      id: [item == null ? '' : item.id],
      competidor: [item == null ? '' : item.nombre_competidor, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      probabilidad: [item == null ? '' : Number(item.probabilidad).toFixed(2), [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }

  onAddCompetidor() {
    this.competidorformArray.push(this.createCompetidorForm());
  }

  onRemoveCompetidor(index: number) {
    this.competidorformArray.removeAt(index);
  }

  cancelCreate() {
    this.eventoForm.reset()
    this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
  }

  editarEvento(newEvento: Evento) {
    this.eventoService.editarEvento(this.token, this.eventoId, newEvento)
      .subscribe(evento => {
        this.showSuccess(evento)
        this.eventoForm.reset()
        this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
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

  sumProbabilities() {
    // Sumar las probabilidades de los competidores
    let sum = 0
    for (let i = 0; i < this.competidorformArray.length; i++) {
      sum += parseFloat(this.competidorformArray.controls[i].value.probabilidad)
    }
    return sum
  }

  nameRepited() {
    // Sumar las probabilidades de los competidores
    let result = false

    for (let i = 0; i < this.competidorformArray.length; i++) {
      let name1 = this.competidorformArray.controls[i].value.competidor
      name1 = name1.replace(/\s/g, '');

      for (let j = i+1; j < this.competidorformArray.length; j++) {
        let name2 = this.competidorformArray.controls[j].value.competidor
        name2 = name2.replace(/\s/g, '');
        if(name1 === name2){
          result = true
        }
      }
      
    }
    return result
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

}
