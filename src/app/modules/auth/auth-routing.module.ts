import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupClientComponent } from 'src/app/pages/signup-client/signup-client.component';
import { SignupSpecialistComponent } from 'src/app/pages/signup-specialist/signup-specialist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup/client', component: SignupClientComponent },
  { path: 'signup/specialist', component: SignupSpecialistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
