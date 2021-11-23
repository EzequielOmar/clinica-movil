import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUsersListComponent } from './simple-users-list.component';

describe('SimpleUsersListComponent', () => {
  let component: SimpleUsersListComponent;
  let fixture: ComponentFixture<SimpleUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
