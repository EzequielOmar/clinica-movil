import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfiles } from './interfaces/user';
//modules
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRedirectLogguedGuardService } from './services/user-redirect-auth/user-redirect-logged-auth.service';
import { UserTypeGuardService } from './services/user-type-auth/user-type-auth.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserRedirectLogguedGuardService],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [UserTypeGuardService],
    data: {
      expectedType: UserProfiles.admin,
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
