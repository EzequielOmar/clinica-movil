import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPersonaComponent } from 'src/app/components/form-persona/form-persona.component';
import { IconsModule } from '../feather-icons/feather.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormPersonaComponent],
  imports: [CommonModule, IconsModule, NgbModule,ReactiveFormsModule],
  exports: [FormPersonaComponent, IconsModule, NgbModule],
})
export class SharedComponentsModule {}
