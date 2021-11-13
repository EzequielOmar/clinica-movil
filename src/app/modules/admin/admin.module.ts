import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//router
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from 'src/app/pages/admin/admin-dashboard/admin-dashboard.component';
import { SpecialistPanelComponent } from 'src/app/pages/admin/specialist-panel/specialist-panel.component';
import { UserPanelComponent } from 'src/app/pages/admin/user-panel/user-panel.component';
import { IconsModule } from '../feather-icons/feather.module';
import { ListaUsuariosComponent } from 'src/app/components/users-list/users-list.component';
import { DetalleUsuarioComponent } from 'src/app/components/user-detail/user-detail.component';
import { AdminPanelComponent } from 'src/app/pages/admin/admin-panel/admin-panel.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
//modules

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SpecialistPanelComponent,
    UserPanelComponent,
    ListaUsuariosComponent,
    DetalleUsuarioComponent,
    AdminPanelComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
