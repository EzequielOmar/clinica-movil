import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserId } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class ListaUsuariosComponent {
  @Input() users!: Array<any>;
  @Input() tipe?: number;
  @Output() userSelected: EventEmitter<UserId> = new EventEmitter<UserId>();

  constructor() {}

  selectUser(user: UserId) {
    this.userSelected?.emit(user);
  }
}
