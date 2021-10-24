interface Persona {
  nombre: string;
  apellido: string;
  f_nac: string; //date.tolocaldatestring - dd/mm/yyyy
  dni: string;
  mail: string;
  img_urls: Array<string>;
  tipo: number;
}
export interface Paciente extends Persona {
  obra_social: string;
}

export interface Especialista extends Persona {
  especialidad: Array<string>;
  verificado: boolean;
}

export interface Admin extends Persona {}

function isPaciente(object: unknown): object is Paciente {
  return (
    Object.prototype.hasOwnProperty.call(object, 'obra_social') &&
    Object.prototype.hasOwnProperty.call(object, 'nombre') &&
    Object.prototype.hasOwnProperty.call(object, 'apellido') &&
    Object.prototype.hasOwnProperty.call(object, 'f_nac') &&
    Object.prototype.hasOwnProperty.call(object, 'dni') &&
    Object.prototype.hasOwnProperty.call(object, 'mail') &&
    Object.prototype.hasOwnProperty.call(object, 'img_urls')
  );
}

function isEspecialista(object: unknown): object is Especialista {
  return (
    Object.prototype.hasOwnProperty.call(object, 'especialidad') &&
    Object.prototype.hasOwnProperty.call(object, 'nombre') &&
    Object.prototype.hasOwnProperty.call(object, 'apellido') &&
    Object.prototype.hasOwnProperty.call(object, 'f_nac') &&
    Object.prototype.hasOwnProperty.call(object, 'dni') &&
    Object.prototype.hasOwnProperty.call(object, 'mail') &&
    Object.prototype.hasOwnProperty.call(object, 'img_urls')
  );
}

function isAdmin(object: unknown): object is Admin {
  return (
    !Object.prototype.hasOwnProperty.call(object, 'especialidad') &&
    !Object.prototype.hasOwnProperty.call(object, 'obra_social') &&
    Object.prototype.hasOwnProperty.call(object, 'nombre') &&
    Object.prototype.hasOwnProperty.call(object, 'apellido') &&
    Object.prototype.hasOwnProperty.call(object, 'f_nac') &&
    Object.prototype.hasOwnProperty.call(object, 'dni') &&
    Object.prototype.hasOwnProperty.call(object, 'mail') &&
    Object.prototype.hasOwnProperty.call(object, 'img_urls')
  );
}

export const UserProfiles = {
  admin: 0,
  specialist: 1,
  pacient: 2,
};

export type User = Admin | Especialista | Paciente;

export function setUserType(user: unknown): void {
  if (isAdmin(user)) user.tipo = UserProfiles.admin;
  if (isEspecialista(user)) user.tipo = UserProfiles.specialist;
  if (isPaciente(user)) user.tipo = UserProfiles.pacient;
}
