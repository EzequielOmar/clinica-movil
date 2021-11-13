import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareObjects } from 'src/app/const/functions';
import { User, UserProfiles } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  //user
  @Input() user?: any;
  oldUser?: User;
  //form manage
  person!: FormGroup;
  userForm!: FormGroup;
  horario!: FormGroup;
  modif: boolean = false;
  sended: boolean = false;
  save: boolean = false;
  specialties: Array<string> = [];

  constructor(private fb: FormBuilder, private userDb: UserService) {}

  ngOnInit(): void {}

  modifProfile() {
    this.modif = true;
    this.person = this.fb.group({
      nombre: [this.user.data.nombre, Validators.required],
      apellido: [this.user.data.apellido, Validators.required],
      f_nac: [this.user.data.f_nac, Validators.required],
      dni: [this.user.data.dni, Validators.required],
      mail: [this.user.data.mail, Validators.required],
      img_urls: [this.user.data.img_urls, Validators.required],
      tipo: [this.user.data.tipo],
      creado: [this.user.data.creado],
      modificado: [this.user.data.modificado],
      eliminado: [this.user.data.eliminado],
    });
    this.userForm = this.fb.group({});
    if (this.user.data.tipo === UserProfiles.specialist) {
      this.userForm.addControl(
        'especialidad',
        this.fb.control(this.user.data.especialidad, Validators.required)
      );
      this.userForm.addControl(
        'horarios',
        this.fb.control(this.user.data.horarios ?? [])
      );
    } else {
      if (this.user.data.tipo === UserProfiles.pacient)
        this.userForm.addControl(
          'obra_social',
          this.fb.control(this.user.data.obra_social, Validators.required)
        );
    }
    this.oldUser = { ...this.userForm.value, ...this.person.value };
  }

  saveChanges() {
    this.sended = true;
    let user: User = { ...this.userForm.value, ...this.person.value };
    if (
      this.userForm.valid &&
      this.person.valid &&
      !compareObjects(user, this.oldUser)
    ) {
      user.modificado = new Date().toLocaleString();
      this.userDb.writeUser(this.user.id, user).finally(() => {
        this.user.data = user;
        this.sended = false;
        this.modif = false;
      });
    }
  }

  deleteUser() {
    //abrir modal

    this.user.data.eliminado = new Date().toLocaleString();
    this.userDb.writeUser(this.user.id, this.user.data);
  }
}
