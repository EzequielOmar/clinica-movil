import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupClientComponent } from 'src/app/pages/signup-client/signup-client.component';
import { SignupSpecialistComponent } from 'src/app/pages/signup-specialist/signup-specialist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryComponent } from 'src/app/pages/recovery/recovery.component';
import { DbService } from 'src/app/services/db/db.service';
import { MaterialModule } from '../material/material.module';
import { IconsModule } from '../feather-icons/feather.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupClientComponent,
    SignupSpecialistComponent,
    RecoveryComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    IconsModule,

    SharedComponentsModule
  ],
  providers: [DbService],
})
export class AuthModule {}
