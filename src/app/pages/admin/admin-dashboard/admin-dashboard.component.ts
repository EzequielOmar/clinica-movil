import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  dropMenu: boolean = false;
  active: number = 0;
  constructor() {}

  ngOnInit(): void {}

  setActive(selected: number) {
    this.active = selected;
  }
}
