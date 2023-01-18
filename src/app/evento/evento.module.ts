import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { EventoCreateComponent } from './evento-create/evento-create.component';
import { EventoDetailComponent } from './evento-detail/evento-detail.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoFinishComponent } from './evento-finish/evento-finish.component';
import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoReportComponent } from './evento-report/evento-report.component';


@NgModule({
  declarations: [EventoListComponent, EventoDetailComponent, EventoCreateComponent, EventoEditComponent, EventoFinishComponent, EventoReportComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, FormsModule
  ],
  exports: [EventoListComponent, EventoDetailComponent, EventoCreateComponent, EventoEditComponent, EventoFinishComponent, EventoReportComponent]
})
export class EventoModule { }
