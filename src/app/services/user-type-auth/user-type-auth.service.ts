import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate = async (route: ActivatedRouteSnapshot): Promise<boolean> => {
    const expectedType = route.data.expectedType;
    return new Promise((res) => {
      this.auth.authUserObservable.subscribe(async (u: any) => {
        if (!u) this.declineAccess(res);
        await this.auth
          .getCurrentUserType(u.uid)
          .then((tipe: number | null) => {
            tipe == expectedType ? res(true) : this.declineAccess(res);
          });
      });
    });
  };

  private declineAccess(res: any) {
    res(false);
    this.router.navigate(['/auth/login']);
  }
}
