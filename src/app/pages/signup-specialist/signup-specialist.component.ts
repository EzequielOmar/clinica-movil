import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidades } from 'src/app/interfaces/lists';

@Component({
  selector: 'app-signup-specialist',
  templateUrl: './signup-specialist.component.html',
  styleUrls: ['../signup-client/signup-client.component.scss'],
})
export class SignupSpecialistComponent {
  //forms
  form: FormGroup;
  persona: FormGroup;
  pass: FormGroup;
  especialidades: Array<string> = Especialidades;
  file?: File;
  //status
  specialtieSelected: string = '';
  sended: boolean = false;
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.pass = this.fb.group({
      password: ['', Validators.required],
      passCheck: ['', Validators.required],
    });
    this.persona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      f_nac: ['', Validators.required],
      dni: ['', Validators.required],
      mail: ['', Validators.required],
    });
    this.form = this.fb.group({
      persona: this.persona,
      especialidad: ['', Validators.required],
      img_url: ['', Validators.required],
    });
  }

  public saveCode(e: any): void {
    console.log(e);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  /**
   * Guarda el archivo temporal, y settea el FormField con el nombre del archivo
   * @param event Recibe el evento de cambio en el input de imagen
   */
  getImage(event: any) {
    this.file = event.target.files[0];
    this.form.controls['img_url'].setValue(event.target.files[0] ?? '');
  }

  send() {
    this.sended = true;
    if (this.form.valid) {
      console.log(this.form);
    }
  }
}
