import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesInputComponent } from './specialties-input.component';

describe('SpecialtiesInputComponent', () => {
  let component: SpecialtiesInputComponent;
  let fixture: ComponentFixture<SpecialtiesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtiesInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
