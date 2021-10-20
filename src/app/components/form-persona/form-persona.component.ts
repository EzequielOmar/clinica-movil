import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['.././../pages/signup-client/signup-client.component.scss'],
})
export class FormPersonaComponent implements OnInit {
  @Input() person!: FormGroup;
  @Input() pass!: FormGroup;
  @Input() sended!: boolean;
  maxAge: number = 99;
  minAge: number = 18;
  constructor() {}

  ngOnInit(): void {}

  getMinDate() {
    return {
      year: new Date().getFullYear() - this.maxAge,
      month: new Date().getMonth(),
      day: new Date().getDate(),
    };
  }

  getMaxDate() {
    return {
      year: new Date().getFullYear() - this.minAge,
      month: new Date().getMonth(),
      day: new Date().getDate(),
    };
  }
}
