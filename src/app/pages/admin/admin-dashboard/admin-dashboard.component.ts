import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  dropMenu: boolean = false;
  active: number = -1;
  user?: any;
  @ViewChild('search') search?: ElementRef;

  constructor(private auth: AuthService) {
    this.user = this.auth.currentUser;
  }

  ngOnInit(): void {}

  setActive(selected: number) {
    this.active = selected;
  }

  signOut() {
    this.auth.signOut(this.user.uid, this.user.multiFactor.user.tipo);
  }
}
