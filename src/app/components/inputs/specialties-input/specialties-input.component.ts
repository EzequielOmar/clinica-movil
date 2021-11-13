import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecialtiesService } from 'src/app/services/specialties/specialties.service';

@Component({
  selector: 'app-specialties-input',
  templateUrl: './specialties-input.component.html',
  styleUrls: ['.././.././../pages/signup-client/signup-client.component.scss'],
})
export class SpecialtiesInputComponent implements OnInit {
  @Input() formWithSpecialtieInput!: FormGroup;
  specialties: Array<string> = [];

  constructor(private specServ: SpecialtiesService) {
    this.specServ.getSpecialitiesObserver().onSnapshot((snap: any) => {
      this.specialties = [];
      snap.forEach((doc: any) => {
        this.specialties.push(doc.id);
      });
    });
  }

  ngOnInit(): void {}

  addSpecialtie(specialtie: string) {
    if (specialtie) this.specServ.newSpecialtie(specialtie);
  }
}
