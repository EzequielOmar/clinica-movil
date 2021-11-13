import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserProfiles } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserRedirectLogguedGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate = async (route: ActivatedRouteSnapshot): Promise<boolean> => {
    return new Promise((res) => {
      this.auth.authUserObservable.subscribe(async (u: any) => {
        if (!u) res(true);
        await this.auth
          .getCurrentUserType(u.uid)
          .then((tipe: number | null) => {
            switch (tipe) {
              case UserProfiles.admin:
                this.router.navigate(['/admin/']);
                res(false);
                break;
              case UserProfiles.specialist:
                this.router.navigate(['/specialist/']);
                break;
              case UserProfiles.admin:
                this.router.navigate(['/pacient/']);
                break;
            }
          });
      });
    });
  };
}
