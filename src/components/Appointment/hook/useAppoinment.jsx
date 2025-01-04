import { useState } from "react";

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: appointment.title,
      start: appointment.start,
      end: appointment.end,
      timeSlot: appointment.timeSlot,
      appointmentType: appointment.appointmentType,
      timezone: appointment.timezone,
      duration: appointment.duration,
    };

    setAppointments([...appointments, newAppointment]);
  };

  return {
    appointments,
    addAppointment,
  };
}
