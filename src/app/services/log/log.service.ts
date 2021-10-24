import { Injectable } from '@angular/core';
import { DbService } from '../db/db.service';
import { dbNames } from 'src/app/interfaces/dbNames';
import { Log } from 'src/app/interfaces/log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private log: Log = { datetime: '', event: 0, uid: '', type: 0 };
  constructor(private db: DbService) {}

  /**
   * Guarda el evento, en coleccion logs documento nombre random.
   * @param uid user id
   * @param event evento (interface de evento)
   * @param type tipo de usuario 0-> admin 1-> especialista 2->cliente
   */
  saveEvent(uid: string, event: number, type: number) {
    this.log.datetime = new Date().toLocaleString();
    this.log.event = event;
    this.log.uid = uid;
    this.log.type = type;
    this.db.set(dbNames.logs, this.log);
  }
}
