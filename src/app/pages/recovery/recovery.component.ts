import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['../signup-client/signup-client.component.scss'],
})
export class RecoveryComponent implements OnInit {
  //forms
  form: FormGroup;
  file?: File;
  //status
  sended: boolean = false;
  spinner: boolean = false;
  error: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      mail: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
  }

  send() {
    this.sended = true;
    if (this.form.valid) {
      this.auth
        .passRecovery(this.form.controls['mail'].value)
        .then(() => {
          this.success = true;
        })
        .catch((err) => {
          this.error = err.message;
        });
    }
  }
}
