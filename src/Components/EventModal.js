import './EventModal.css';
import React, { useState } from 'react';

const EventModal = ({ date, events, addEvent, deleteEvent, onClose }) => {
  const [event, setEvent] = useState({
    eventName: '',
    startTime: '',
    endTime: '',
    category: 'Personal',
    description: '',
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEvent({ ...event, [field]: value });
  };

  const handleSubmit = () => {
    if (!event.eventName || !event.startTime || !event.endTime || !event.category) {
      alert('Please fill all required fields.');
      return;
    }

    if (event.startTime >= event.endTime) {
      alert('End time must be later than start time.');
      return;
    }

    addEvent(date, event);
    onClose();
  };

  const handleDelete = (index) => {
    deleteEvent(date, index);
  };

  // Get the event category color
  const getEventCategoryColor = (category) => {
    switch (category) {
      case 'Work':
        return '#ffcccb'; // Light red for work
      case 'Personal':
        return '#add8e6'; // Light blue for personal
      case 'Other':
        return '#d3d3d3'; // Light grey for other
      default:
        return '#ffffff'; // Default if category is unrecognized
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Event on {date}</h2>
        <label>Event Name</label>
        <input
          type="text"
          value={event.eventName}
          onChange={(e) => handleInputChange(e, 'eventName')}
          placeholder="Enter event name"
        />
        <label>Start Time</label>
        <input
          type="time"
          value={event.startTime}
          onChange={(e) => handleInputChange(e, 'startTime')}
        />
        <label>End Time</label>
        <input
          type="time"
          value={event.endTime}
          onChange={(e) => handleInputChange(e, 'endTime')}
        />
        <label>Category</label>
        <select
          value={event.category}
          onChange={(e) => handleInputChange(e, 'category')}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
        <label>Description</label>
        <textarea
          value={event.description}
          onChange={(e) => handleInputChange(e, 'description')}
          placeholder="Describe the event"
        />
        <button type="submit" onClick={handleSubmit}>
          Add Event
        </button>
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
        <h3>Existing Events:</h3>
        <ul>
          {events.map((eventItem, index) => (
            <li
              key={index}
              style={{ backgroundColor: getEventCategoryColor(eventItem.category), color: 'white' }}
            >
              {eventItem.eventName} ({eventItem.startTime} - {eventItem.endTime}, {eventItem.category})
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventModal;