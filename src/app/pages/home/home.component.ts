import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  images = [1, 2, 3].map((n) => `/assets/carousel/${n}.jpg`);
  show: boolean = false;
  user?: any | null;

  constructor(
    config: NgbCarouselConfig,
    private router: Router,
    private Auth: AuthService
  ) {
    setInterval(() => {
      //console.log(this.Auth.currentUser);
      console.log(this.Auth.currentUser);
    }, 3000);

    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.show = !this.show;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToSignClient() {
    this.router.navigate(['/auth/signup/client']);
  }

  goToSignPro() {
    this.router.navigate(['/auth/signup/specialist']);
  }

  logOut() {
    //this.Auth.signOut(this.user.uid,);
  }
}
