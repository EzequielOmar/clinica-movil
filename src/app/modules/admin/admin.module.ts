import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//router
import { AdminRoutingModule } from './admin-routing.module';
<<<<<<< HEAD
import { AdminDashboardComponent } from 'src/app/pages/admin/admin-dashboard/admin-dashboard.component';
import { SpecialistPanelComponent } from 'src/app/pages/admin/specialist-panel/specialist-panel.component';
import { UserPanelComponent } from 'src/app/pages/admin/user-panel/user-panel.component';
import { FeatherModule } from 'angular-feather';
import { IconsModule } from '../feather-icons/feather.module';
//modules

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SpecialistPanelComponent,
    UserPanelComponent,
  ],
  imports: [CommonModule, AdminRoutingModule,IconsModule],
=======
//modules

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule],
>>>>>>> parent of de85c4a... casi terminando logueo
})
export class AdminModule {}
