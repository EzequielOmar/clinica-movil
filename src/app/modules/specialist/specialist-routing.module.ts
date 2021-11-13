import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSpecialistComponent } from 'src/app/pages/specialist/profile-specialist/profile-specialist.component';
import { SpecialistDashboardComponent } from 'src/app/pages/specialist/specialist-dashboard/specialist-dashboard.component';
import { AppointmentsSpecialistComponent } from 'src/app/pages/specialist/appointments-specialist/appointments-specialist.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SpecialistDashboardComponent,
    children: [
      {
        path: '',
        component: AppointmentsSpecialistComponent,
        outlet: 'specialistMenu',
      },
      {
        path: 'perfil',
        component: ProfileSpecialistComponent,
        outlet: 'specialistMenu',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistRoutingModule {}
