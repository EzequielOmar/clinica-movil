import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointmenComponent } from './new-appointmen.component';

describe('NewAppointmenComponent', () => {
  let component: NewAppointmenComponent;
  let fixture: ComponentFixture<NewAppointmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAppointmenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppointmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
