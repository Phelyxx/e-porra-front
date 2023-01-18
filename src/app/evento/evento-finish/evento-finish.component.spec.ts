/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoFinishComponent } from './evento-finish.component';

describe('EventoFinishComponent', () => {
  let component: EventoFinishComponent;
  let fixture: ComponentFixture<EventoFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventoFinishComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
