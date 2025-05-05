// src/appointment/mapper/appointment.mapper.ts

import { GenAppointmentResponsetDto } from "../dto/gen-appointment-response.dto";

export class AppointmentMapper {
  static toAppointmentWithPatientDto(raw: any): GenAppointmentResponsetDto {
    return {
      id: raw.a_id, // Appointment ID
      reason: raw.a_reason, // Reason for appointment
      status: raw.a_status, // Appointment status
      appointmentDate: raw.appointment_date, // Appointment date
      doctorId: raw.doctor_id, // Doctor ID
      patientId: raw.patient_id, // Patient ID
      patient: {
        id: raw.p_id, // Patient ID
        firstName: raw.first_name, // First name of the patient
        lastName: raw.last_name, // Last name of the patient
      },
    };
  }
}

