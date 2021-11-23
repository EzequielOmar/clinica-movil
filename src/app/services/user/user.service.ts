import { Injectable } from '@angular/core';
import { dbNames } from 'src/app/interfaces/dbNames';
import { User, UserId, UserProfiles } from 'src/app/interfaces/user';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: DbService) {}

  writeUser = async (uid: string, user: User) => {
    await this.db.setWithId(dbNames.users, uid, user);
  };

  getUser = async (uid: string): Promise<User> =>
    await this.db
      .getDocOnce(dbNames.users, uid)
      .then((doc: any) => doc.data() as User)
      .catch((err) => err);

  getUsersByType(type: number) {
    return this.db
      .getObserverDb(dbNames.users)
      .where('tipo', '==', type)
      .where('eliminado', '==', false);
  }

  getSpecialistsBySpecialtie = async (spec: string) => {
    let specialists: Array<UserId> = [];
    await this.getUsersByType(UserProfiles.specialist)
      .where('especialidad', 'array-contains', spec)
      .get()
      .then((snap: any) => {
        snap.forEach((d: any) => {
          if (d.exists) {
            specialists.push({ id: d.id, data: d.data() });
          }
        });
      });
    return specialists;
  };
}
