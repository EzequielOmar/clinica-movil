import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setUserType, User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-signup-specialist',
  templateUrl: './signup-specialist.component.html',
  styleUrls: ['../signup-client/signup-client.component.scss'],
})
export class SignupSpecialistComponent {
  //forms
  form: FormGroup;
  person: FormGroup;
  pass: FormGroup;
  specialties: Array<string> = [];
  files: Array<File> = [];
  //status
  sended: boolean = false;
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private file: FileService
  ) {
    this.pass = this.fb.group({
      password: ['', Validators.required],
      passCheck: ['', Validators.required],
    });
    this.person = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      f_nac: ['', Validators.required],
      dni: ['', Validators.required],
      mail: ['', Validators.required],
    });
    this.form = this.fb.group({
      especialidad: [[], Validators.required],
      img_urls: [[]],
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  getImage(event: any) {
    this.files = event.target.files;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  send() {
    this.sended = true;
    if (this.validateForms()) {
      this.spinner = true;
      let user: User = { ...this.form.value, ...this.person.value };
      setUserType(user);
      this.auth
        .signUp(user, this.pass.controls['password'].value)
        .then((res) => {
          this.file
            .handleFiles(user, res.user?.uid ?? '', this.files)
            .then(() => {
              this.auth.manageUserData(user, res).then(() => {
                this.auth.updateAuthUserProfile(user);
                this.auth.signOut(res.user?.uid ?? '', user.tipo);
              });
            });
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
      this.pass.valid &&
      this.pass.controls['password'].value ===
        this.pass.controls['passCheck'].value
    );
  }
}
