import { Component, Input, OnInit } from '@angular/core';
import { UserProfiles, Especialista, UserId } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-specialist-panel',
  templateUrl: './specialist-panel.component.html',
  styleUrls: ['./specialist-panel.component.scss'],
})
export class SpecialistPanelComponent implements OnInit {
  specialists: Array<UserId> = [];
  selected?: UserId;

  constructor(private userDb: UserService) {
    this.getSpecialist();
  }

  ngOnInit(): void {}

  selectUser(user: UserId) {
    this.selected = user;
  }

  private getSpecialist() {
    this.userDb.getUsersByType(UserProfiles.specialist).onSnapshot((snap) => {
      this.specialists = [];
      snap.forEach((child: any) => {
        this.specialists.push({
          id: child.id,
          data: child.data() as Especialista,
        });
      });
    });
  }
}
