import { Component, OnInit } from '@angular/core';
import { Paciente, UserId, UserProfiles } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  pacients: Array<UserId> = [];
  selected?: UserId;

  constructor(private userDb: UserService) {
    this.getSpecialist();
  }

  ngOnInit(): void {}

  selectUser(user: UserId) {
    this.selected = user;
  }

  private getSpecialist() {
    this.userDb.getUsersByType(UserProfiles.pacient).onSnapshot((snap) => {
      this.pacients = [];
      snap.forEach((child: any) => {
        this.pacients.push({
          id: child.id,
          data: child.data() as Paciente,
        });
      });
    });
  }
}
