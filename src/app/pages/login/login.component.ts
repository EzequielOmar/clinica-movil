import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../././../pages/signup-client/signup-client.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  //status
  sended: boolean = false;
  error: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  forgotPass() {
    this.router.navigate(['/auth/recovery']);
  }

  fillForm(user: string) {
    switch (user) {
      case 'admin':
        this.form.controls['mail'].setValue('admin@gmail.com');
        this.form.controls['password'].setValue('admin');
        break;
      case 'specialist':
        this.form.controls['mail'].setValue('specialist@gmail.com');
        this.form.controls['password'].setValue('specialist');
        break;
      case 'tester':
        this.form.controls['mail'].setValue('tester@gmail.com');
        this.form.controls['password'].setValue('tester');
        break;
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  send() {
    console.log(this.form);
  }
}
