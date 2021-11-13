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

@NgModule({
  declarations: [
    FormPersonaComponent,
    UserUpdateComponent,
    SpecialtiesInputComponent,
    DayHourInputComponent,
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
  ],
})
export class SharedComponentsModule {}
