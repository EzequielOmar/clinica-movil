interface Persona {
  nombre: string;
  apellido: string;
  f_nac: string; //date.tolocaldatestring - dd/mm/yyyy
  dni: string;
  mail: string;
  img_urls: Array<string>;
  tipo: number;
  creado: string;
  modificado: string;
  eliminado: string;
}

export const E_Dias = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
};

export interface Paciente extends Persona {
  obra_social: string;
}

export interface Especialista extends Persona {
  especialidad: Array<string>;
  verificado: boolean;
  horarios: Array<{ dia: number; de: string; a: string }>;
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
  admin: 1,
  specialist: 2,
  pacient: 3,
};

export type User = Admin | Especialista | Paciente;
null;

export type UserId = { id: string; data: User };

export function setUserType(user: any): void {
  if (isAdmin(user)) user.tipo = UserProfiles.admin;
  if (isEspecialista(user)) user.tipo = UserProfiles.specialist;
  if (isPaciente(user)) user.tipo = UserProfiles.pacient;
  user.creado = new Date().toLocaleString();
  user.modificado = false;
  user.eliminado = false;
}
