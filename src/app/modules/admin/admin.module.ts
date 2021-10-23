import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//router
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from 'src/app/pages/admin/admin-dashboard/admin-dashboard.component';
//modules

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
