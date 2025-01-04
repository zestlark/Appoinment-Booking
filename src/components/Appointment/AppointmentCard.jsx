import React, { useState, memo, useCallback, useMemo } from "react"
import { getAppoinmentTypeColor } from "./colors"

const AppoinmentCard = ({ appointment, style }) => {
    const color = getAppoinmentTypeColor(appointment.appointmentType)
    return (
        <div style={{ backgroundColor: color, ...style }}
            className="w-full bg-blue-100 p-2 z-0 mb-1 truncate rounded group"
        // style={{ backgroundColor: color }}
        >
            <p className="text-sm">{appointment.title}</p>
            <p className="text-xs mt-2">{appointment.appointmentType}</p>
            <span className="text-xs mt-5"> {new Date(appointment.start).toLocaleTimeString()} - {new Date(appointment.end).toLocaleTimeString()}</span>

            <div className={`absolute hidden z-50 group-hover:block shadow-2xl min-w-[200px] min-h-[100px] border rounded-md p-2 bg-white backdrop-blur-3xl`} style={{ backgroundColor: color + "66" }}>
                <p className="text-lg">{appointment.title}</p>
                <p className="text-xs mt-2">Appoinment : {appointment.appointmentType}</p>
                <p className="text-xs mt-2"> Start time : {new Date(appointment.start).toLocaleTimeString()}</p>
                <p className="text-xs mt-2"> End time : {new Date(appointment.end).toLocaleTimeString()}</p>
                {/* <div className="mt-3 text-sm flex justify-between items-center gap-2">
                    <button className="w-full p-2 py-1.5 rounded-md bg-blue-500/50">Edit</button>
                    <button className="w-full p-2 py-1.5 rounded-md bg-red-500/50">Delete</button>
                </div> */}
            </div>
        </div >
    )
}

export default AppoinmentCard



const AppoinmentCardWeekView = memo(({ appointment, style, setweekViewCardState }) => {
    const color = useMemo(() => getAppoinmentTypeColor(appointment.appointmentType), []);

    const handleMouse = useCallback((event) => {
        setweekViewCardState({
            x: event.clientX,
            y: event.clientY,
            color,
            ...appointment
        });
    }, [setweekViewCardState, appointment, color]);



    const handleMouseOut = useCallback(() => {
        setweekViewCardState({});
    }, [setweekViewCardState, appointment]);

    return (
        <div
            style={{ backgroundColor: color, ...style }}
            className="w-full bg-blue-100 p-2 z-0 mb-1 truncate rounded group"
            onMouseEnter={handleMouse}
            // onMouseMove={handleMouse}
            onMouseOut={handleMouseOut}
        >
            <p className="text-sm">{appointment.title}</p>
            <p className="text-xs mt-2">{appointment.appointmentType}</p>
            <span className="text-xs mt-5">
                {new Date(appointment.start).toLocaleTimeString()} - {new Date(appointment.end).toLocaleTimeString()}
            </span>
        </div>
    );
});

export { AppoinmentCardWeekView };
