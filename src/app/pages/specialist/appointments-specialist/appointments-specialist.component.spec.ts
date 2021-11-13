import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSpecialistComponent } from './appointments-specialist.component';

describe('TurnosSpecialistComponent', () => {
  let component: AppointmentsSpecialistComponent;
  let fixture: ComponentFixture<AppointmentsSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsSpecialistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
