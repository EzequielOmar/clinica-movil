import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupClientComponent } from 'src/app/pages/signup-client/signup-client.component';
import { SignupSpecialistComponent } from 'src/app/pages/signup-specialist/signup-specialist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPersonaComponent } from 'src/app/components/form-persona/form-persona.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    SignupClientComponent,
    SignupSpecialistComponent,
    FormPersonaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class AuthModule {}
