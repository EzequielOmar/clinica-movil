import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { User, UserProfiles } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
})
export class AppointmentDetailComponent implements OnInit, OnChanges {
  @Input() appointment?: Appointment;
  @Input() filter?: string;
  //2 para filtrar p/especialista - 3 para filtrar p/paciente
  @Input() filterBy?: number = 1;
  //el output retorna el valor coincidente (para mostrar en search bar)
  @Output() coincidenceValue: EventEmitter<{ type: string; value: string }> =
    new EventEmitter<{ type: string; value: string }>();
  show: boolean = true;
  spec?: User;
  pac?: User;

  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.getPacientAndSpecialist().then(() => {
      this.filterAppointments();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter) {
      this.filterAppointments();
    }
  }

  private getPacientAndSpecialist() {
    return Promise.all([
      this.us
        .getUser(this.appointment?.especialista ?? '')
        .then((u) => (this.spec = u)),
      this.us
        .getUser(this.appointment?.paciente ?? '')
        .then((u) => (this.pac = u)),
    ]);
  }

  private filterAppointments() {
    if (
      this.checkSpecialtie() ||
      (this.filterBy === UserProfiles.specialist && this.checkSpecialist()) ||
      (this.filterBy === UserProfiles.pacient && this.checkPacient())
    )
      this.show = true;
    else this.show = false;
  }

  private checkSpecialtie() {
    if (
      this.appointment?.especialidad
        .toLowerCase()
        .startsWith(this.filter?.toLowerCase() ?? '')
    ) {
      this.coincidenceValue.emit({
        type: 'Especialidad',
        value: this.appointment?.especialidad,
      });
      return true;
    }
    return false;
  }

  private checkSpecialist() {
    if (
      this.spec?.nombre
        .toLowerCase()
        .startsWith(this.filter?.toLowerCase() ?? '') ||
      this.spec?.apellido
        .toLowerCase()
        .startsWith(this.filter?.toLowerCase() ?? '')
    ) {
      this.coincidenceValue.emit({
        type: 'Especialista',
        value: this.spec?.apellido + ', ' + this.spec?.nombre,
      });
      return true;
    }
    return false;
  }

  private checkPacient() {
    if (
      this.pac?.nombre
        .toLowerCase()
        .startsWith(this.filter?.toLowerCase() ?? '') ||
      this.pac?.apellido
        .toLowerCase()
        .startsWith(this.filter?.toLowerCase() ?? '')
    ) {
      this.coincidenceValue.emit({
        type: 'Paciente',
        value: this.pac?.apellido + ', ' + this.pac?.nombre,
      });
      return true;
    }
    return false;
  }
}
