import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSpecialistComponent } from './signup-specialist.component';

describe('SignupSpecialistComponent', () => {
  let component: SignupSpecialistComponent;
  let fixture: ComponentFixture<SignupSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
