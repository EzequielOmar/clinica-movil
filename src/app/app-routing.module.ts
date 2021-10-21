import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//modules
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';

//const redirectLoggedToHome = () => redirectLoggedInTo(['home']);
//const redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
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
