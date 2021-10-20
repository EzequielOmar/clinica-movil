interface Persona {
  nombre: string;
  apllido: string;
  f_nac: string; //date.tolocaldatestring - dd/mm/yyyy
  dni: string;
  mail: string;
}

export interface Paciente extends Persona {
  obra_social: string;
  img_urls: Array<string>;
}

export interface Especialista extends Persona {
  especialidad: string;
  img_url: string;
}

export interface Admin extends Persona {
  img_url: string;
}
