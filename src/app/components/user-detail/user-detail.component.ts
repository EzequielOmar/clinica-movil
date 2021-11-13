import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { setUserType, User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file/file.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {
  @Input() user?: any;
  @Input() tipe?: number;
  //forms
  form: FormGroup;
  person: FormGroup;
  pass: FormGroup;
  files: Array<File> = [];
  //status
  sended: boolean = false;
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private auth: AuthService,
    private file: FileService,
    private userDb: UserService
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
      img_urls: [[]],
    });
  }

  ngOnInit(): void {}

  getEdad(fecha: any): string {
    if (fecha) {
      let años =
        (new Date().getTime() - new Date(fecha).getTime()) /
        (1000 * 3600 * 24 * 365);
      return Math.floor(años).toString();
    }
    return '';
  }

  //specialist

  validateSpecialist(user: any) {
    user.data.verificado = !user.data.verificado;
    this.userDb.writeUser(user.id, user.data);
  }

  //admin

  openNewAdmin(altaAdmin: any) {
    this.modalService.open(altaAdmin, { ariaLabelledBy: 'modal-basic-title' });
  }

  getImage(event: any) {
    this.files = event.target.files;
  }

  send() {
    this.sended = true;
    if (this.validateForms()) {
      this.spinner = true;
      let user: User = { ...this.form.value, ...this.person.value };
      setUserType(user);
      this.auth
        .signUpOnOtherThread(user, this.pass.controls['password'].value)
        .then((res) => {
          this.file.handleFiles(user, res?.user?.uid ?? '', this.files).then(()=>{
            this.auth.manageUserData(user, res);
            this.showSuccess();
          });
        })
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => {
          this.spinner = false;
          this.modalService.dismissAll();
        });
    }
  }

  deleteUser(user: any) {
    user.data.eliminado = new Date().toLocaleString();
    this.userDb.writeUser(user.id, user.data);
  }

  private validateForms() {
    return (
      this.form.valid &&
      this.pass.valid &&
      this.pass.controls['password'].value ===
        this.pass.controls['passCheck'].value &&
      this.files.length
    );
  }

  private showSuccess() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }
}
