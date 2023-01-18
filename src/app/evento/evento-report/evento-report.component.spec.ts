/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoReportComponent } from './evento-report.component';

describe('EventoFinishComponent', () => {
  let component: EventoReportComponent;
  let fixture: ComponentFixture<EventoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventoReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
