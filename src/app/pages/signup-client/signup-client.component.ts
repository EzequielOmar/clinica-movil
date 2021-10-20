import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prestadores } from 'src/app/interfaces/lists';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss'],
})
export class SignupClientComponent implements OnInit {
  //forms
  form: FormGroup;
  persona: FormGroup;
  pass: FormGroup;
  file?: File;
  //status
  prestadores: Array<string> = Prestadores;
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
      obra_social: ['', Validators.required],
      img_urls: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
    if (this.form.valid && this.form.controls['img_urls'].value.length > 1) {
      console.log(this.form);
    }
  }
}
