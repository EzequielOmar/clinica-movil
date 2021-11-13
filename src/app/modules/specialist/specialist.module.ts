import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistDashboardComponent } from 'src/app/pages/specialist/specialist-dashboard/specialist-dashboard.component';
import { AppointmentsSpecialistComponent } from 'src/app/pages/specialist/appointments-specialist/appointments-specialist.component';
import { ProfileSpecialistComponent } from 'src/app/pages/specialist/profile-specialist/profile-specialist.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    SpecialistDashboardComponent,
    AppointmentsSpecialistComponent,
    ProfileSpecialistComponent,
  ],
  imports: [CommonModule, SpecialistRoutingModule, SharedComponentsModule],
})
export class SpecialistModule {}
