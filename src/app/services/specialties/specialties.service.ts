import { Injectable } from '@angular/core';
import { dbNames } from 'src/app/interfaces/dbNames';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  specialties: Array<string> = [];

  constructor(private db: DbService) {}

  getSpecialitiesObserver() {
    return this.db.getObserverDb(dbNames.specialties);
  }

  newSpecialtie(specialtie: string) {
    specialtie =
      specialtie.charAt(0).toLocaleUpperCase() +
      specialtie.slice(1).toLowerCase();
    let rx =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    if (!this.specialties.includes(specialtie) && rx.test(specialtie))
      this.db.setWithId(dbNames.specialties, specialtie);
  }
}
