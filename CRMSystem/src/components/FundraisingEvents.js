```javascript
import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../api/eventApi';

const FundraisingEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    objectives: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCreateEvent = async () => {
    try {
      await createEvent(newEvent);
      setNewEvent({
        name: '',
        date: '',
        location: '',
        objectives: '',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (eventId, updatedEvent) => {
    try {
      await updateEvent(eventId, updatedEvent);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h2>Fundraising Events</h2>
      <div>
        <h3>Create New Event</h3>
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleInputChange}
          placeholder="Event Name"
        />
        <input
          type="text"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          placeholder="Event Date"
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          placeholder="Event Location"
        />
        <input
          type="text"
          name="objectives"
          value={newEvent.objectives}
          onChange={handleInputChange}
          placeholder="Event Objectives"
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
      <div>
        <h3>Existing Events</h3>
        {events.map((event) => (
          <div key={event.id}>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={(e) => handleUpdateEvent(event.id, { ...event, name: e.target.value })}
            />
            <input
              type="text"
              name="date"
              value={event.date}
              onChange={(e) => handleUpdateEvent(event.id, { ...event, date: e.target.value })}
            />
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={(e) => handleUpdateEvent(event.id, { ...event, location: e.target.value })}
            />
            <input
              type="text"
              name="objectives"
              value={event.objectives}
              onChange={(e) => handleUpdateEvent(event.id, { ...event, objectives: e.target.value })}
            />
            <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundraisingEvents;
```
