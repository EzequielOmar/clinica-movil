import { Component, Input, OnInit } from '@angular/core';
import { UserId } from 'src/app/interfaces/user';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {
  @Input() user?: any;
  @Input() tipe?: number;

  constructor() {}

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
}
