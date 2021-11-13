import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-day-hour-input',
  templateUrl: './day-hour-input.component.html',
  styleUrls: ['.././.././../pages/signup-client/signup-client.component.scss'],
})
export class DayHourInputComponent implements OnInit {
  @Input() formWithHoursInput!: FormGroup;
  horario!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.horario = this.fb.group({
      dia: [1, Validators.required],
      de: ['06:00', Validators.required],
      a: ['21:00', Validators.required],
    });
  }

  ngOnInit(): void {
    this.horario.valueChanges.subscribe((c) => {
      if (
        this.horario.controls['de'].value.split(':')[0] >=
        this.horario.controls['a'].value.split(':')[0]
      )
        this.horario.controls['de'].setErrors(['']);
      else this.horario.controls['de'].setErrors(null);
    });
  }

  addHours() {
    if (this.horario.valid) {
      let hr = {
        dia: this.horario.controls['dia'].value,
        de: this.horario.controls['de'].value,
        a: this.horario.controls['a'].value,
      };
      this.formWithHoursInput.controls['horarios'].setValue([
        hr,
        ...this.formWithHoursInput.controls['horarios'].value,
      ]);
    }
  }
}
