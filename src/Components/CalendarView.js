import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import './CalendarView.css';

const CalendarView = ({ events, addEvent, deleteEvent, moveEvent, setSelectedDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState(null);

  const getCalendarDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const handleDragStart = (event, date, index) => {
    setDraggedEvent({ date, index, event });
  };

  const handleDrop = (targetDate) => {
    if (draggedEvent) {
      moveEvent(draggedEvent.date, targetDate, draggedEvent.index);
      setDraggedEvent(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const days = getCalendarDays();

  return (
    <div>
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>Previous</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next</button>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-cell ${
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'today' : ''
            } ${format(day, 'yyyy-MM-dd') === selectedDate ? 'selected-day' : ''}`}
            onClick={() => setSelectedDate(format(day, 'yyyy-MM-dd'))}
            onDrop={() => handleDrop(format(day, 'yyyy-MM-dd'))}
            onDragOver={handleDragOver}
          >
            <div className="calendar-date">{format(day, 'd')}</div>
            <ul className="events-list">
              {(events[format(day, 'yyyy-MM-dd')] || []).map((event, idx) => (
                <li
                  key={idx}
                  className={`event-${event.category.toLowerCase()}`}
                  draggable
                  onDragStart={() => handleDragStart(event, format(day, 'yyyy-MM-dd'), idx)}
                >
                  {event.eventName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
