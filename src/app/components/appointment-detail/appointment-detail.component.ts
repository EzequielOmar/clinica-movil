import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
})
export class AppointmentDetailComponent implements OnInit {
  @Input() appointment?: Appointment;

  constructor() {}

  ngOnInit(): void {}
}
