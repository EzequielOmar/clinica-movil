import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-perfil-specialist',
  templateUrl: './profile-specialist.component.html',
  styleUrls: ['./profile-specialist.component.scss'],
})
export class ProfileSpecialistComponent implements OnInit {
  user?: any;

  constructor(private auth: AuthService, private userDb: UserService) {
    if (this.auth.currentUser)
      this.userDb
        .getUser(this.auth.currentUser.uid)
        .then(
          (user: any) =>
            (this.user = { id: this.auth.currentUser?.uid, data: user })
        );
  }

  ngOnInit(): void {}
}
