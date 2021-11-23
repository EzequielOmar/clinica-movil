import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserId } from 'src/app/interfaces/user';

@Component({
  selector: 'app-simple-users-list',
  templateUrl: './simple-users-list.component.html',
  styleUrls: ['./simple-users-list.component.scss']
})
export class SimpleUsersListComponent {
  @Input() users?: Array<UserId>;
  @Output() userSelected: EventEmitter<UserId> =
    new EventEmitter<UserId>();
  user?: UserId;

  constructor() {}

  selectUser(user: UserId) {
    this.userSelected?.emit(user);
    this.user = user;
  }
}
