import React, { useState, useEffect } from 'react';
import CalendarView from './Components/CalendarView';
import EventModal from './Components/EventModal';
import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (date, event) => {
    const updatedEvents = { ...events };
    if (!updatedEvents[date]) updatedEvents[date] = [];
    updatedEvents[date].push(event);
    setEvents(updatedEvents);
  };

  const deleteEvent = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date].splice(index, 1);
    if (updatedEvents[date].length === 0) delete updatedEvents[date];
    setEvents(updatedEvents);
  };

  const moveEvent = (sourceDate, targetDate, eventIndex) => {
    const updatedEvents = { ...events };
    const [movedEvent] = updatedEvents[sourceDate].splice(eventIndex, 1);
    if (!updatedEvents[targetDate]) updatedEvents[targetDate] = [];
    updatedEvents[targetDate].push(movedEvent);
    if (updatedEvents[sourceDate].length === 0) delete updatedEvents[sourceDate];
    setEvents(updatedEvents);
  };

  const exportEvents = (format) => {
    const eventsToExport = Object.keys(events).map((date) =>
      events[date].map((event) => ({ date, ...event }))
    ).flat();

    if (format === 'json') {
      const jsonBlob = new Blob([JSON.stringify(eventsToExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'events.json';
      a.click();
    } else if (format === 'csv') {
      const csvContent = [
        ['Date', 'Event Name', 'Start Time', 'End Time', 'Category', 'Description'],
        ...eventsToExport.map((e) => [
          e.date,
          e.eventName,
          e.startTime,
          e.endTime,
          e.category,
          e.description
        ]),
      ]
        .map((row) => row.join(','))
        .join('\n');

      const csvBlob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'events.csv';
      a.click();
    }
  };

  const filteredEvents = (events) => {
    if (!filterKeyword) return events;
    const filtered = {};
    Object.keys(events).forEach((date) => {
      const filteredEventsOnDate = events[date].filter((event) =>
        event.eventName.toLowerCase().includes(filterKeyword.toLowerCase())
      );
      if (filteredEventsOnDate.length) filtered[date] = filteredEventsOnDate;
    });
    return filtered;
  };

  return (
    <div className="App">
      <h1>React Event Calendar</h1>
      <input
        type="text"
        placeholder="Filter events by keyword"
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
      />
      <div className="export-buttons">
        <button onClick={() => exportEvents('json')} className="export-btn">Export as JSON</button>
        <button onClick={() => exportEvents('csv')} className="export-btn">Export as CSV</button>
      </div>
      <CalendarView
        events={filteredEvents(events)}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
        moveEvent={moveEvent}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      {selectedDate && (
        <EventModal
          date={selectedDate}
          events={events[selectedDate] || []}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default App;
