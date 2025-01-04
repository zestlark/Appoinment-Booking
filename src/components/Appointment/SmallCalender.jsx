import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SmallCalendar = ({
    selectedDate,
    onSelectDate,
    disabledDates = [],
    disableWeekends = false,
    disablePastDates = false,
    className = ""
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const primaryColor = "blue"

    const getDayNames = (abbreviated = true) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return abbreviated ? days.map(day => day.slice(0, 1)) : days;
    };

    const generateCalendar = () => {
        const daysInMonth = [];
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const numDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        for (let i = 0; i < startingDay; i++) {
            daysInMonth.push({ date: null, isDisabled: true });
        }

        for (let day = 1; day <= numDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isPastDate = date < new Date();
            const isDisabled =
                (disableWeekends && isWeekend) ||
                (disablePastDates && isPastDate) ||
                disabledDates.some(disabledDate => disabledDate.toDateString() === date.toDateString());

            daysInMonth.push({
                date,
                isDisabled,
            });
        }

        return daysInMonth;
    };

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const changeYear = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(currentDate.getFullYear() + direction);
        setCurrentDate(newDate);
    };

    const daysInMonth = generateCalendar();
    const dayNames = getDayNames();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonthName = monthNames[currentDate.getMonth()];

    return (
        <div className={`space-y-2 ${className}`}>
            {/* back next and month year */}
            <div className="flex items-center justify-between gap-4 space-x-2 mb-5">
                <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold flex justify-center items-center"
                >
                    <FaChevronLeft className="text-sm" />
                </button>
                {/* date title */}
                <h2 className="text-lg font-medium">
                    {currentMonthName} {currentDate.getFullYear()}
                </h2>
                <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold flex justify-center items-center"
                >
                    <FaChevronRight className="text-sm" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center font-semibold">
                {dayNames.map((day, index) => (
                    <div key={index} className="text-sm text-gray-700">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {daysInMonth.map((day, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => day.date && !day.isDisabled && onSelectDate(day.date)}
                        className={`p-2 aspect-square rounded-full 
                            ${day.date ? (day.isDisabled
                                ? 'bg-gray-200 text-gray-400'
                                : (selectedDate?.toDateString() === day.date?.toDateString()
                                    ? `bg-${primaryColor}-500 text-white`
                                    : `bg-transparent text-gray-700 hover:bg-gray-500/10`)
                            ) : 'bg-transparent text-transparent'}`}
                        disabled={day.isDisabled}
                    >
                        {day.date ? day.date.getDate() : ''}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default SmallCalendar;
