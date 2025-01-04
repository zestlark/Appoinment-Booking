import React, { useState, useEffect } from 'react';
import SmallCalendar from './SmallCalender';
import { appointmentTypes } from './appointmentTypes';

const AddAppointment = ({ onClose, onAddAppointment, existingBookings = [] }) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [duration, setDuration] = useState(30);
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [appointmentType, setAppointmentType] = useState('');
  const [slotError, setSlotError] = useState(''); // Error message for slot selection

  const primaryColor = "blue"

  const generateSlots = (duration) => {
    const slots = [];
    const startLimit = 10 * 60; // 10:00 AM in minutes
    const endLimit = 20 * 60; // 8:00 PM in minutes
    let startTime = startLimit;

    while (startTime < endLimit) {
      const startHour = Math.floor(startTime / 60);
      const startMinute = startTime % 60;
      const endTime = startTime + Number(duration);
      const endHour = Math.floor(endTime / 60);
      const endMinute = endTime % 60;

      const formattedStart = `${startHour < 10 ? '0' : ''}${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`;
      const formattedEnd = `${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`;

      if (endTime <= endLimit) {
        slots.push({ start: formattedStart, end: formattedEnd });
      }

      startTime = endTime;
    }

    setAvailableSlots(slots);
  };


  useEffect(() => {
    generateSlots(duration);
  }, [duration]);

  useEffect(() => {
    const allTimezones = Intl.supportedValuesOf('timeZone');
    setTimezones(allTimezones);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    if (isSlotBooked(slot)) {
      setSlotError('This slot is already booked.');
      return;
    }
    setSelectedSlot(slot);
    setSlotError('');
  };

  const handleTimezoneSelect = (timezone) => {
    setSelectedTimezone(timezone);
  };

  const handleAppointmentTypeChange = (e) => {
    setAppointmentType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentType || appointmentType === "Select an Appointment Type") {
      setSlotError('Please select a valid appointment type.');
      return;
    }
    if (!selectedSlot) {
      setSlotError('Please select a time slot.');
      return;
    }
    const date = new Date(selectedDate);
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    const [startHour, startMinute] = selectedSlot.start.split(":").map(Number);
    const start = new Date(year, month, day, startHour, startMinute);
    const [endHour, endMinute] = selectedSlot.end.split(":").map(Number);
    const end = new Date(year, month, day, endHour, endMinute);

    onAddAppointment({
      title: title,
      appointmentType: appointmentType,
      start: start,
      end: end,
      timeSlot: selectedSlot,
      duration: parseInt(duration, 10),
      timezone: selectedTimezone,
    });
    onClose();
    setTitle('');
    setSelectedDate(null);
    setSelectedSlot('');
    setAppointmentType('');
  };

  const isSlotBooked = (slot) => {
    if (!selectedDate) return false; // Prevent errors if no date is selected

    // Ensure selectedDate is a valid Date object
    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
      console.error('Invalid selectedDate:', selectedDate);
      return false;
    }

    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    const [startHour, startMinute] = slot.start.split(":").map(Number);
    const [endHour, endMinute] = slot.end.split(":").map(Number);

    const slotStart = new Date(year, month, day, startHour, startMinute);
    const slotEnd = new Date(year, month, day, endHour, endMinute);

    console.log('Slot Start:', slotStart, 'Slot End:', slotEnd, 'Slot:', slot, "value");

    return existingBookings.some((booking) => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

      return slotStart < bookingEnd && slotEnd > bookingStart;
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 max-h-[90%] overflow-scroll rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Add New Appointment</h2>

        {/* Appointment Type Selection */}
        <div>
          <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700">
            Appointment Type
          </label>
          <select
            id="appointmentType"
            value={appointmentType}
            onChange={handleAppointmentTypeChange}
            className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option >Select an Appointment Type</option>
            {appointmentTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Calendar */}
          <SmallCalendar disablePastDates={true} className="bg-gray-100 p-5 rounded-2xl" selectedDate={selectedDate} onSelectDate={handleDateSelect} disabledDates={[]} />

          {/* Timezone */}
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Select Timezone
            </label>
            <select
              id="timezone"
              value={selectedTimezone}
              onChange={(e) => handleTimezoneSelect(e.target.value)}
              className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              {timezones.map((timezone, index) => (
                <option key={index} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          {/* Slot Selection */}
          <div>
            <label htmlFor="slot" className="block text-sm font-medium text-gray-700">
              Select Slot
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-2 rounded-md text-sm font-medium border border-gray-300 shadow-sm  ${selectedSlot?.start === slot.start
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-indigo-100'
                    }`}
                  disabled={isSlotBooked(slot)}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {slotError && <p className="text-red-600 text-sm text-center">{slotError}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 w-full py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
