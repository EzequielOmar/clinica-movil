import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-perfil-specialist',
  templateUrl: './profile-specialist.component.html',
  styleUrls: ['./profile-specialist.component.scss'],
})
export class ProfileSpecialistComponent implements OnInit {
  user?: any;

  constructor(private auth: AuthService) {
    this.auth.getCurrentUser().then((u) => {
      this.user = u;
    });
  }

  ngOnInit(): void {}
}
