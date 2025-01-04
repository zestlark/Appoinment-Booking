import React from "react";
import { colors } from "./colors";
import AppoinmentCard from "./AppointmentCard";
// import { Appointment } from "./hooks/useAppointments";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const DayView = ({ currentDate, appointments }) => {
  const getAppointmentsForHour = (hour) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.start);
      return (
        appointmentDate.getDate() === currentDate.getDate() &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear() &&
        appointmentDate.getHours() === hour
      );
    });
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {HOURS.map((hour) => (
        <div key={hour} className="flex border-b border-gray-200 py-2">
          <div className="w-20 text-right pr-4">{hour}:00</div>
          <div className="flex gap-3">
            {getAppointmentsForHour(hour).map((appointment) => (
              // <div
              //   key={appointment.id}
              //   className="bg-blue-100 p-2 mb-1 rounded"
              //   style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
              // >
              //   <div className="font-medium">{appointment.title}</div>
              //   <div className="text-sm">
              //     {new Date(appointment.start).toLocaleTimeString()} -{" "}
              //     {new Date(appointment.end).toLocaleTimeString()}
              //   </div>
              // </div>
              <AppoinmentCard appointment={appointment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayView;
