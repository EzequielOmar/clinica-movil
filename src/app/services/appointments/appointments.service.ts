import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Appointment,
  E_AppointmentState,
} from 'src/app/interfaces/appointment';
import { dbNames } from 'src/app/interfaces/dbNames';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService implements OnDestroy {
  constructor(private db: DbService) {}

  ngOnDestroy() {}

  newAppointment(appointment: Appointment) {
    return this.db.set(dbNames.appointments, appointment);
  }

  getAppointments() {
    return this.db
      .getObserverDb(dbNames.appointments)
      .where('estado', '!=', E_AppointmentState.archivado)
      .get();
  }

  /**
   * Retorna los turnos tomados de un determinado especialista para une fecha indicada
   * @param specialistId uid del especialista
   * @param date fecha a buscar formato dd-mm-yyyy
   */
  getTakenAppointments = async (
    specialistId: string,
    date: string
  ): Promise<string[]> => {
    let takenHours: string[] = [];
    return await this.db
      .getObserverDb(dbNames.appointments)
      .where('especialista', '==', specialistId)
      .where('dia', '==', date)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          let app = doc.data() as Appointment;
          takenHours.push(app.hora);
        });
        return takenHours;
      });
  };
}
