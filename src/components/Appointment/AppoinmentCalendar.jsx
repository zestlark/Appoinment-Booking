import React, { useState } from "react";
// import { Appointment } from "./hooks/useAppointments";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import AddAppointment from "./AddAppoinment";
import { useAppointments } from "./hook/useAppoinment";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import AgendaView from "./AgendaView";

const AppoinmentCalendar = () => {
  // appoinment form state
  const primaryColor = "blue"
  const { appointments, addAppointment } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const views = ["month", "week", "day", "appoinment"];

  const prevPeriod = () => {
    switch (view) {
      case views[0]: // month
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
        break;
      case views[1]: // week
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7
          )
        );
        break;
      case views[2]: // day
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
          )
        );
        break;
    }
  };

  const nextPeriod = () => {
    switch (view) {
      case "month":
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
        break;
      case "week":
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 7
          )
        );
        break;
      case "day":
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          )
        );
        break;
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-10 relative">
        {/* timeline switch */}
        <div className="flex justify-center w-[420px] bg-gray-100 relative rounded-lg">
          <div
            className={`toggle h-full bg-blue-500 absolute z-0 rounded-lg }`} style={{ left: `${(100 / views.length) * (views.indexOf(view))}%`, width: 100 / views.length + "%" }}
          ></div>
          {views.map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-0 py-2 relative border-l first-of-type:border-none z-10 ${view === item ? "text-white" : "text-black"
                }`} style={{ width: 100 / views.length + "%" }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* back next and month year */}
        <div className="flex items-center justify-center gap-4 space-x-2 absolute left-[50%] -translate-x-[50%] ">
          <button
            onClick={prevPeriod}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold flex justify-center items-center"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          {/* date title */}
          <h2 className="text-lg font-medium">
            {view === "day"
              ? currentDate.toLocaleDateString("default", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              : currentDate.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })}
          </h2>
          <button
            onClick={nextPeriod}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold flex justify-center items-center"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {/* add new btn */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={` bg-${primaryColor}-500 flex items-center justify-center gap-3 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
          <FaPlus /> New Appointment
        </button>
      </div>

      {view === "month" && (
        <MonthView currentDate={currentDate} appointments={appointments} />
      )}
      {view === "week" && (
        <WeekView currentDate={currentDate} appointments={appointments} />
      )}
      {view === "day" && (
        <DayView currentDate={currentDate} appointments={appointments} />
      )}
      {view === "appoinment" && (
        <AgendaView currentDate={currentDate} appointments={appointments} />
      )}

      {isModalOpen && <AddAppointment
        onClose={() => setIsModalOpen(false)}
        onAddAppointment={addAppointment}
      />}
    </div>
  );
};

export default AppoinmentCalendar;
