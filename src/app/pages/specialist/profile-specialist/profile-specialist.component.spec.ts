import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSpecialistComponent } from './profile-specialist.component';

describe('PerfilSpecialistComponent', () => {
  let component: PerfilSpecialistComponent;
  let fixture: ComponentFixture<PerfilSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
