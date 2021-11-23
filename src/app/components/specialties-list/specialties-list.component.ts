import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-specialties-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['./specialties-list.component.scss'],
})
export class SpecialtiesListComponent {
  @Input() specialties!: Array<string>;
  @Output() specialtieSelected: EventEmitter<string> =
    new EventEmitter<string>();
  spec?: string;

  constructor() {}

  selectSpecialtie(spec: string) {
    this.specialtieSelected?.emit(spec);
    this.spec = spec;
  }
}
