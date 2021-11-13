import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayHourInputComponent } from './day-hour-input.component';

describe('DayHourInputComponent', () => {
  let component: DayHourInputComponent;
  let fixture: ComponentFixture<DayHourInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayHourInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayHourInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
