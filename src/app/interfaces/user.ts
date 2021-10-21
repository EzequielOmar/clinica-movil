interface Persona {
  nombre: string;
  apellido: string;
  f_nac: string; //date.tolocaldatestring - dd/mm/yyyy
  dni: string;
  mail: string;
  img_urls: Array<string>;
}

export interface Paciente extends Persona {
  obra_social: string;
}

export interface Especialista extends Persona {
  especialidad: string;
}

export interface Admin extends Persona {}
