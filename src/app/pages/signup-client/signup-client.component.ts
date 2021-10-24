import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prestadores } from 'src/app/interfaces/prestadores';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  files: Array<File> = [];
  //status
  prestadores: Array<string> = Prestadores;
  sended: boolean = false;
  spinner: boolean = false;
  error: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
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
      obra_social: ['', Validators.required],
      img_urls: [[]],
    });
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/home']);
  }

  getImage(event: any) {
    this.files = event.target.files;
  }

  send() {
    this.sended = true;
    if (this.validateForms()) {
      this.spinner = true;
      let user = { ...this.form.value, ...this.persona.value };
      this.auth
        .signUp(user, this.pass.controls['password'].value, this.files)
        .then((res) => {
          this.auth.signOut(res.user?.uid ?? '');
          this.success = true;
        })
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  private validateForms() {
    return (
      this.form.valid &&
      this.files.length > 1 &&
      this.persona.valid &&
      this.pass.valid &&
      this.pass.controls['password'].value ===
        this.pass.controls['passCheck'].value
    );
  }
}
