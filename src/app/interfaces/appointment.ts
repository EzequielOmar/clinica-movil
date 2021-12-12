export const E_AppointmentState = {
  solicitado: 1,
  aceptado: 2,
  cancelado: 3,
  finalizado: 4,
  archivado: 5,
};

export const E_EventAppointmentComment = {
  cancelado: 1,
  diagnostico: 2,
  otro: 3,
};

export interface AppointmentComment {
  evento: number; //E_EventAppointmentComment
  mensaje: string;
}

export interface Appointment {
  dia: number;
  hora: string; //hh:mm
  especialista: string; //uid
  paciente: string; //uid
  especialidad: string; //nombre (solo)
  estado: number; //E_AppointmentState
  comentarios: Array<AppointmentComment>;
  calificacion: number; //0a5
}

export interface AppointmentId {
  id: string;
  data: Appointment;
}
