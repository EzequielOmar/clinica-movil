import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  error: boolean = false;
  success: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      mail: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  send() {
    console.log(this.form);
  }
}
