import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/interfaces/appointment';
import { UserId } from 'src/app/interfaces/user';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { SpecialtiesService } from 'src/app/services/specialties/specialties.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-appointmen',
  templateUrl: './new-appointmen.component.html',
  styleUrls: ['./new-appointmen.component.scss'],
})
export class NewAppointmenComponent implements OnInit {
  specialties: Array<string> = [];
  specialists?: Array<UserId>;
  specialist?: any;
  daysAheadAppointment: number = 15;
  dates: Array<Date> = [];
  hours: Array<string> = [];
  hoursTaked: Array<string> = [];
  //form
  appointment: FormGroup;

  constructor(
    private specServ: SpecialtiesService,
    private userDb: UserService,
    private fb: FormBuilder,
    private as: AppointmentsService
  ) {
    this.appointment = this.fb.group({
      dia: ['', Validators.required],
      hora: ['', Validators.required],
      especialista: ['', Validators.required],
      paciente: ['', Validators.required],
      especialidad: ['', Validators.required],
      estado: [''],
      comentarios: [[]],
      calificacion: [''],
    });
    this.getSpecialtiesOnce();
  }

  ngOnInit(): void {}

  receiveSpecialtie(specialtie: string) {
    this.appointment.controls['especialidad'].setValue(specialtie);
    this.getSpecialistOnce(specialtie);
  }

  receiveSpecialist(specialist: UserId) {
    this.appointment.controls['especialista'].setValue(specialist.id);
    this.specialist = specialist;
    this.getDays(this.specialist.data.horarios);
  }

  receiveDate(date: any) {
    date = new Date(date);
    this.appointment.controls['dia'].setValue(
      date.toLocaleDateString().replaceAll('/', '-')
    );
    this.getHours(date);
  }

  getAppointment() {
    return this.appointment.value as Appointment;
  }

  private getSpecialtiesOnce() {
    this.specServ.getSpecialtiesOnce().then((doc: any) => {
      doc.forEach((d: any) => {
        this.specialties?.push(d.id);
      });
    });
  }

  private getSpecialistOnce(spec: string) {
    this.userDb.getSpecialistsBySpecialtie(spec).then((specialists: any) => {
      this.specialists = specialists;
    });
  }

  /**
   * Consulta los dias disponibles del especialista,
   * Carga las fechas en las que va a estar disponible el especialista
   * en la variable dates[]
   * desde hoy a daysAheadAppointment en adelante
   * @param hours Recibe horarios del especialista
   */
  private getDays(hours: any) {
    let daysAvailable: any[] = [];
    let hoy = new Date();
    hours.forEach((hr: any) => {
      daysAvailable.push(hr.dia);
    });
    for (let i = 1; i <= this.daysAheadAppointment; i++) {
      hoy.setDate(hoy.getDate() + 1);
      if (daysAvailable.includes(hoy.getDay())) this.dates.push(new Date(hoy));
    }
  }

  private getHours(date: Date) {
    this.as
      .getTakenAppointments(
        this.specialist.id,
        this.appointment.controls['dia'].value
      )
      .then((taken: string[]) => {
        this.hoursTaked.push(...taken);
      });

    this.getAvailableHours(date);
  }

  /**
   * Consulta los horarios del especialista en el dia que corresponda
   * y carga la variable hours[] con los todos turnos posibles (hh:mm)
   * @param date Recibe la fecha en formato Date para buscar horarios disponibles
   */
  private getAvailableHours(date: Date) {
    this.specialist.data.horarios.forEach((hr: any) => {
      if (hr.dia === date.getDay()) {
        let availableHour;
        availableHour = hr.de;
        do {
          this.hours.push(availableHour);
          let [hh, mm]: any = availableHour.split(':');
          if (mm === '00') mm = '30';
          else {
            mm = '00';
            hh =
              parseInt(hh) > 8
                ? (parseInt(hh) + 1).toString()
                : '0' + (parseInt(hh) + 1).toString();
          }
          availableHour = hh + ':' + mm;
        } while (availableHour !== hr.a);
      }
    });
  }
}
