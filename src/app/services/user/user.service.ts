import { Injectable } from '@angular/core';
import { DbService } from '../db/db.service';
import { dbNames } from 'src/app/interfaces/dbNames';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: DbService) {}
/*
  newUser(uid: string, user: UserData) {
    this.db.setWithId(databases.users, uid, user);
  }

  exists = async (uid: string) =>
    await this.db
      .getDocOnce(databases.users, uid)
      .then(() => true)
      .catch(() => false);*/
}
