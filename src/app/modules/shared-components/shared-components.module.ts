import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPersonaComponent } from 'src/app/components/form-person/form-person.component';
import { IconsModule } from '../feather-icons/feather.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { MaterialModule } from '../material/material.module';
import { SpecialtiesInputComponent } from 'src/app/components/inputs/specialties-input/specialties-input.component';
import { DayHourInputComponent } from 'src/app/components/inputs/day-hour-input/day-hour-input.component';
import { DayPipe } from 'src/app/pipes/day/day.pipe';
import { AppointmentDetailComponent } from 'src/app/components/appointment-detail/appointment-detail.component';
import { SpecialtiesListComponent } from '../../components/specialties-list/specialties-list.component';
import { SimpleUsersListComponent } from '../../components/simple-users-list/simple-users-list.component';
import { NewAppointmenComponent } from 'src/app/components/new-appointment/new-appointmen.component';
import { BtnSpinnerDirective } from 'src/app/directives/btn-spinner/btn-spinner.directive';

@NgModule({
  declarations: [
    FormPersonaComponent,
    UserUpdateComponent,
    SpecialtiesInputComponent,
    DayHourInputComponent,
    DayPipe,
    AppointmentDetailComponent,
    SpecialtiesListComponent,
    SimpleUsersListComponent,
    NewAppointmenComponent,
    BtnSpinnerDirective,
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FormPersonaComponent,
    IconsModule,
    NgbModule,
    UserUpdateComponent,
    SpecialtiesInputComponent,
    DayHourInputComponent,
    DayPipe,
    AppointmentDetailComponent,
    SpecialtiesListComponent,
    SimpleUsersListComponent,
    NewAppointmenComponent,
    BtnSpinnerDirective,
  ],
})
export class SharedComponentsModule {}
