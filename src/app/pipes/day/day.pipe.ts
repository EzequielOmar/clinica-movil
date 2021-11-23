import { Pipe, PipeTransform } from '@angular/core';
import { E_Dias } from 'src/app/interfaces/user';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: any): any {
    switch (parseInt(value)) {
      case E_Dias.lunes:
        value = 'Lunes';
        break;
      case E_Dias.martes:
        value = 'Martes';
        break;
      case E_Dias.miercoles:
        value = 'Miercoles';
        break;
      case E_Dias.jueves:
        value = 'Jueves';
        break;
      case E_Dias.viernes:
        value = 'Viernes';
        break;
      case E_Dias.sabado:
        value = 'Sabado';
        break;
    }
    return value;
  }
}
