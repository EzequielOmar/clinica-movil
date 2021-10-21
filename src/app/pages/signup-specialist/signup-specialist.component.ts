import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dbNames } from 'src/app/interfaces/dbNames';
import { Especialista } from 'src/app/interfaces/user';
import { DbService } from 'src/app/services/db/db.service';

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
  especialidades: Array<string> = [];
  file?: File;
  //status
  specialtieSelected: string = '';
  sended: boolean = false;
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DbService
  ) {
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
      img_urls: ['', Validators.required],
    });
    this.getSpecialities();
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
    this.form.controls['img_urls'].setValue(event.target.files ?? '');
  }

  send() {
    this.sended = true;
    if (this.validateForms()) {
      let client: Especialista = this.form.value as Especialista;
      console.log(typeof client);
    }
  }

  private getSpecialities() {
    this.db.getDbOnce(dbNames.especialidades).then((snap: any) => {
      snap.forEach((doc: any) => {
        this.especialidades.push(doc.id);
      });
    });
  }

  private validateForms() {
    return (
      this.form.valid &&
      this.pass.valid &&
      this.pass.controls['password'].value ===
        this.pass.controls['passCheck'].value
    );
  }
}
