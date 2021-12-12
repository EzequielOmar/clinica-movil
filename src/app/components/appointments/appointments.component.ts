import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentId } from 'src/app/interfaces/appointment';
import { User, UserProfiles } from 'src/app/interfaces/user';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointments?: AppointmentId[];
  coincidences?: any[];
  filterBy?: number;
  search: string = '';

  constructor(private as: AppointmentsService, private auth: AuthService) {
    this.getAppointments();
    this.auth.getCurrentUser().then((u: User | null) => {
      if (u?.tipo === UserProfiles.specialist)
        this.filterBy = UserProfiles.pacient;
      else this.filterBy = UserProfiles.specialist;
    });
  }

  ngOnInit(): void {}

  getFilterTypeString() {
    return this.filterBy === UserProfiles.pacient ? 'Paciente' : 'Especialista';
  }

  searchValue(value: string) {
    this.coincidences = [];
    this.search = value;
  }

  receiveCoincidence(coincidence: any) {
    console.log(coincidence);
    this.coincidences?.push(coincidence);
  }

  private getAppointments() {
    this.appointments = [];
    this.as.getAppointments().then((snap) => {
      snap.forEach((doc) => {
        this.appointments?.push({
          id: doc.id,
          data: doc.data() as Appointment,
        } as AppointmentId);
      });
    });
  }
}
