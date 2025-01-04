import React from "react";
import { colors } from "./colors";

const AgendaView = ({ currentDate, appointments }) => {
    const isPast = (appointmentDate) => {
        return new Date(appointmentDate).getTime() < new Date().getTime();
    };

    // Function to format the date to show weekday, month, date, and year
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return new Intl.DateTimeFormat("default", options).format(date);
    };

    // Group appointments by date
    const groupByDate = (appointments) => {
        return appointments.reduce((groups, appointment) => {
            const date = new Date(appointment.start).toLocaleDateString(); // Key is the date
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(appointment);
            return groups;
        }, {});
    };

    const groupedAppointments = groupByDate(appointments);

    return (
        <div className="space-y-4">
            {Object.keys(groupedAppointments).map((date) => {
                const isAppointmentPast = groupedAppointments[date].some(appointment => isPast(appointment.start));
                const formattedDate = formatDate(date);

                return (
                    <div key={date} className="flex justify-between border-b pb-4">
                        <div className="w-[20%] px-5">
                            <div className="font-medium text-lg">{formattedDate}</div>
                        </div>
                        <div className="w-[80%] space-y-2">
                            {groupedAppointments[date].map((appointment) => {
                                const appointmentDate = new Date(appointment.start);
                                return (
                                    <div
                                        key={appointment.id}
                                        className={`p-4 border rounded-md ${isPast(appointment.start) ? "bg-gray-100" : "bg-white"}`}
                                    >
                                        <div className="flex justify-between">
                                            <div className="font-medium">{appointment.title}</div>
                                            {isPast(appointment.start) && (
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">Past</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {appointmentDate.toLocaleTimeString()} -{" "}
                                            {new Date(appointment.end).toLocaleTimeString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {appointments.length === 0 && <div className="h-[80vh] flex items-center text-center w-full justify-center capitalize">no Appoinemnts yet </div>}
        </div>
    );
};

export default AgendaView;
