import React from "react";
import { colors } from "./colors";
import AppoinmentCard from "./AppointmentCard";
// import { Appointment } from "./hooks/useAppointments";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const WeekView = ({ currentDate, appointments }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const getAppointmentsForDay = (date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.start);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-2">
        <div className="text-center p-3 font-medium text-gray-700">Time</div>
        {DAYS.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + DAYS.indexOf(day));
          return (
            <div key={day} className="text-center p-3 font-medium text-gray-700" style={{ backgroundColor: colors[index] }}>
              {day}
              <br />
              {date.getDate()}
            </div>
          );
        })}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-center pr-2">{hour}:00</div>
            {DAYS.map((day, index) => {
              const date = new Date(startOfWeek);
              date.setDate(startOfWeek.getDate() + index);
              const dayAppointments = getAppointmentsForDay(date);
              const hourAppointments = dayAppointments.filter((appointment) => {
                const appointmentHour = new Date(appointment.start).getHours();
                return appointmentHour === hour;
              });
              return (
                <div
                  key={`${day}-${hour}`}
                  className="border border-gray-200 p-1 min-h-12 overflow-y-auto"
                >
                  {hourAppointments.map((appointment) => (
                    <AppoinmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;


// import React, { useState } from "react";
// import { colors } from "./colors";
// import { AppoinmentCardWeekView } from "./AppointmentCard";



// const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const HOURS = Array.from({ length: 24 }, (_, i) => i);

// const WeekView = ({ currentDate, appointments }) => {
//   const [weekViewCardState, setweekViewCardState] = useState({})
//   if (!currentDate) {
//     return <div>Loading...</div>;
//   }

//   const startOfWeek = new Date(currentDate);
//   startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

//   const getAppointmentsForDay = (date) => {
//     return appointments.filter((appointment) => {
//       if (!appointment.start) return false;
//       const appointmentDate = new Date(appointment.start);
//       return (
//         appointmentDate.getDate() === date.getDate() &&
//         appointmentDate.getMonth() === date.getMonth() &&
//         appointmentDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };

//   const getAppointmentStyle = (appointment) => {
//     if (!appointment.start || !appointment.end) return {};

//     const startMinutes = appointment.start.getHours() * 60 + appointment.start.getMinutes();
//     const endMinutes = appointment.end.getHours() * 60 + appointment.end.getMinutes();
//     const duration = endMinutes - startMinutes;

//     return {
//       position: 'absolute',
//       top: `${(startMinutes / 1440) * 100}%`,
//       height: `${(duration / 1440) * 100}%`,
//       left: '0px',
//       right: '0px',
//       zIndex: 10,
//       overflow: 'hidden',
//       borderRadius: '4px',
//       padding: '2px',
//       fontSize: '0.75rem',
//     };
//   };

//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow">
//       <div className="grid grid-cols-7 gap-px bg-gray-200">
//         {DAYS.map((day, index) => {
//           const date = new Date(startOfWeek);
//           date.setDate(startOfWeek.getDate() + index);
//           const dayAppointments = getAppointmentsForDay(date);
//           return (
//             <div key={day} className="bg-white">
//               <div className="bg-gray-100 p-2 font-medium text-gray-500">
//                 <div>{day}</div>
//                 <div className="text-sm">{date.getDate()}</div>
//               </div>
//               <div className="relative h-[1440px]"> {/* 24 hours * 60 minutes */}
//                 {dayAppointments.map((appointment) => (
//                   <AppoinmentCardWeekView
//                     key={appointment.id}
//                     appointment={appointment}
//                     style={getAppointmentStyle(appointment)}
//                     weekViewCardState={weekViewCardState}
//                     setweekViewCardState={setweekViewCardState}
//                   />
//                 ))}
//                 {/* Time indicators */}
//                 {Array.from({ length: 24 }).map((_, hour) => (
//                   <div
//                     key={hour}
//                     className="absolute w-full border-t border-gray-200 text-xs text-gray-400 pl-1"
//                     style={{ top: `${(hour / 24) * 100}%` }}
//                   >
//                     {hour}:00
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {weekViewCardState?.x &&
//         <div id="weekViewMoveCard" className={`fixed z-50 group-hover:block shadow-2xl min-w-[200px] min-h-[100px] border rounded-md p-2 bg-white backdrop-blur-3xl`} style={{ backgroundColor: weekViewCardState.color + "66", left: weekViewCardState.x + 10 + "px", top: weekViewCardState.y + 10 + "px" }}>
//           <p className="text-lg">{weekViewCardState.title}</p>
//           <p className="text-xs mt-2">Appoinment : {weekViewCardState.appointmentType}</p>
//           <p className="text-xs mt-2"> Start time : {new Date(weekViewCardState.start).toLocaleTimeString()}</p>
//           <p className="text-xs mt-2"> End time : {new Date(weekViewCardState.end).toLocaleTimeString()}</p>
//           <div className="mt-3 text-sm flex justify-between items-center gap-2">
//             <button className="w-full p-2 py-1.5 rounded-md bg-blue-500/50">Edit</button>
//             <button className="w-full p-2 py-1.5 rounded-md bg-red-500/50">Delete</button>
//           </div>
//         </div>}

//     </div>
//   );
// };

// export default WeekView;

