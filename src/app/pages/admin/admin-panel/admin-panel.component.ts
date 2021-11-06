import { Component, OnInit } from '@angular/core';
import { Admin, UserId, UserProfiles } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  admins: Array<UserId> = [];
  selected?: UserId;

  constructor(private userDb: UserService, private auth: AuthService) {
    this.getSpecialist();
  }

  ngOnInit(): void {}

  selectUser(user: UserId) {
    this.selected = user;
  }

  private getSpecialist() {
    this.userDb.getUsersByType(UserProfiles.admin).onSnapshot((snap) => {
      this.admins = [];
      snap.forEach((child: any) => {
        if (child.id != this.auth.currentUser?.uid)
          this.admins.push({
            id: child.id,
            data: child.data() as Admin,
          });
      });
    });
  }
}
