import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from 'src/app/services/CustomDateAdapter/custom-date-adapter.service';
import { CustomDateParserFormatter } from 'src/app/services/CustomDateParserFormatter/custom-date-parser-formatter.service';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['.././../pages/signup-client/signup-client.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
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
