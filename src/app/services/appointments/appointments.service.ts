import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/interfaces/appointment';
import { dbNames } from 'src/app/interfaces/dbNames';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService implements OnDestroy {
  constructor(private db: DbService) {}

  ngOnDestroy() {}

  newAppointment(appointment: Appointment) {
    this.db.set(dbNames.appointments, appointment);
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
        takenHours.push("07:30");
        takenHours.push("19:30");
        return takenHours;
      });
  };
}
