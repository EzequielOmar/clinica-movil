import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupClientComponent } from 'src/app/pages/signup-client/signup-client.component';
import { SignupSpecialistComponent } from 'src/app/pages/signup-specialist/signup-specialist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPersonaComponent } from 'src/app/components/form-persona/form-persona.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryComponent } from 'src/app/pages/recovery/recovery.component';
import { DbService } from 'src/app/services/db/db.service';
<<<<<<< HEAD
import { MaterialModule } from '../material/material.module';
import { IconsModule } from '../feather-icons/feather.module';
=======
>>>>>>> parent of de85c4a... casi terminando logueo

@NgModule({
  declarations: [
    LoginComponent,
    SignupClientComponent,
    SignupSpecialistComponent,
    FormPersonaComponent,
    RecoveryComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
<<<<<<< HEAD
    MaterialModule,
    IconsModule,
=======
>>>>>>> parent of de85c4a... casi terminando logueo
  ],
  providers: [DbService],
})
export class AuthModule {}
