// src/appointment/dto/appointment-with-patient.dto.ts

export class GenAppointmentResponsetDto {
    id: string;
    doctorId: string;
    patientId: string;
    appointmentDate: string;
    status: string;
    reason: string;
    patient: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }
  