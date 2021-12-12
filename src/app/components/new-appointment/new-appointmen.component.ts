import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Appointment,
  E_AppointmentState,
} from 'src/app/interfaces/appointment';
import { User, UserId, UserProfiles } from 'src/app/interfaces/user';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpecialtiesService } from 'src/app/services/specialties/specialties.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-appointmen',
  templateUrl: './new-appointmen.component.html',
  styleUrls: ['./new-appointmen.component.scss'],
})
export class NewAppointmenComponent implements OnInit {
  //current user
  user!: User;
  //form/show data
  pacients!: UserId[];
  specialties: Array<string> = [];
  specialists?: Array<UserId>;
  specialist?: any;
  daysAheadAppointment: number = 15;
  dates: Array<Date> = [];
  hours: Array<string> = [];
  hoursTaked: Array<string> = [];
  //form
  spinner: boolean = false;
  success: boolean = false;
  error: boolean = false;
  appointment!: FormGroup;

  constructor(
    private specServ: SpecialtiesService,
    private userDb: UserService,
    private fb: FormBuilder,
    private as: AppointmentsService,
    private auth: AuthService
  ) {
    Promise.all([
      this.getSpecialtiesOnce(),
      this.userDb
        .getUser(this.auth.currentUser?.uid ?? '')
        .then((u) => (this.user = u)),
    ]).then(() => {
      if (this.user.tipo === UserProfiles.admin) this.getPacientsOnce();
      this.appointment = this.fb.group({
        dia: ['', Validators.required],
        hora: ['', Validators.required],
        especialista: ['', Validators.required],
        paciente: [
          this.user.tipo === UserProfiles.pacient
            ? this.auth.currentUser?.uid
            : '',
          Validators.required,
        ],
        especialidad: ['', Validators.required],
        estado: [E_AppointmentState.solicitado],
        comentarios: [[]],
        calificacion: [''],
      });
    });
  }

  ngOnInit(): void {}

  receivePacient(pacient: string) {
    this.appointment.controls['paciente'].setValue(pacient);
  }

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

  receiveHour(hs: string) {
    if (!this.hoursTaked.includes(hs))
      this.appointment.controls['hora'].setValue(hs);
  }

  getAppointment() {
    return this.appointment.value as Appointment;
  }

  clear() {
    this.specialist = null;
    this.appointment.reset();
  }

  saveAppointment() {
    this.spinner = true;
    this.as
      .newAppointment(this.appointment.value as Appointment)
      .then(() => {
        this.spinner = false;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      })
      .catch(() => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
          this.clear();
        }, 3000);
      });
  }

  private getSpecialtiesOnce = async () =>
    await this.specServ.getSpecialtiesOnce().then((doc: any) => {
      doc.forEach((d: any) => {
        this.specialties?.push(d.id);
      });
    });

  private getSpecialistOnce(spec: string) {
    this.userDb.getSpecialistsBySpecialtie(spec).then((specialists: any) => {
      this.specialists = specialists;
    });
  }

  private getPacientsOnce() {
    this.userDb.getUsersByType(UserProfiles.pacient).onSnapshot((snap) => {
      this.pacients = [];
      snap.forEach((child: any) => {
        this.pacients.push({
          id: child.id,
          data: child.data() as User,
        });
      });
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
    this.dates = [];
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
    this.hoursTaked = [];
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
        this.hours = [];
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
