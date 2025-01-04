import React from "react";
import { colors } from "./colors";
import AppoinmentCard from "./AppointmentCard";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthView = ({ currentDate, appointments }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const getAppointmentsForDay = (day) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.start);
      return (
        appointmentDate.getDate() === day &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  return (
    <div>
      <div className="grid grid-cols-7 border gap-0 mb-0 rounded-t-md overflow-hidden">
        {DAYS.map((day, index) => (
          <div key={day} className="text-center first-of-type::rounded-tl-md last-of-type:rounded-tr-md p-3 border font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0 border rounded-b-md">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="min-h-24 p-1 border border-gray-200"
          ></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayAppointments = getAppointmentsForDay(day);
          return (
            <div
              key={day}
              className="min-h-24 p-3 py-2 border border-gray-200 overflow-y-auto"
            >
              <div className="font-medium text-gray-500 text-2xl mb-1">{day}</div>
              <div className="flex gap-2">
                {dayAppointments.slice(0, 2).map((appointment) => (
                  <AppoinmentCard key={appointment.id} appointment={appointment} />
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs min-w-8 w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
                    +{dayAppointments.length - 2}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
