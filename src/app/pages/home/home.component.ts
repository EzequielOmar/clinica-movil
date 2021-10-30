import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnDestroy {
  images = [1, 2, 3].map((n) => `/assets/carousel/${n}.jpg`);
  show: boolean = false;
  user?: any | null;
  sub?: Subscription;

  constructor(
    config: NgbCarouselConfig,
    private router: Router,
    private Auth: AuthService
  ) {
    //this.sub = this.Auth.authUserObservable.subscribe((u) => (this.user = u));
    this.sub = this.Auth.authUserObservable.subscribe((u) => {
      this.user = u;
      setInterval(() => {
        console.log(this.user);
      }, 3000);
    });
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

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
    this.Auth.signOut(this.user?.uid ?? '', this.user?.tipo ?? '');
  }
}
