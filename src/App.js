import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createRecord, getRecords } from "./lib/api_calls";
import "./App.css";

const localizer = momentLocalizer(moment);

const processIfDayWasSuccessful = (dailyRecord) => {
  return true;
};

const App = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [events, setEvents] = useState([
    {
      title: "Daily Record",
      start: new Date(),
      end: new Date(),
      exerciseBeforeWork: true,
      takeDailySupplements: true,
      meditationToTime: true,
      dietFollowed: true,
      noPhone: true,
      distractionBlockerOnAndUpdated: true,
      scrollingResisted: true,
      startDayWithPlan: true,
      dailyReflection: "Today was a day",
      dailyPlan: "I had this plan",
    },
    {
      title: "Daily Record",
      start: yesterday,
      end: yesterday,
      exerciseBeforeWork: false,
      takeDailySupplements: true,
      meditationToTime: true,
      dietFollowed: true,
      noPhone: true,
      distractionBlockerOnAndUpdated: true,
      scrollingResisted: true,
      startDayWithPlan: true,
      dailyReflection: "Today was a day",
      dailyPlan: "I had this plan",
    },
    {
      title: "Daily Record",
      start: tomorrow,
      end: tomorrow,
      exerciseBeforeWork: false,
      takeDailySupplements: true,
      meditationToTime: true,
      dietFollowed: true,
      noPhone: false,
      distractionBlockerOnAndUpdated: true,
      scrollingResisted: true,
      startDayWithPlan: true,
      dailyReflection: "Today was a day",
      dailyPlan: "I had this plan",
    },
  ]);

  const [records, setRecords] = useState([]);
  const [processedRecords, setProcessedRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const processRecords = (records, setProcessedRecords) => {
    const processedRecords = [];
    console.log("All records", records);
    for (let record in records) {
      const newStructuredRecord = records[record];
      const dateTimeDate = new Date(newStructuredRecord.date);
      newStructuredRecord.start = dateTimeDate;
      newStructuredRecord.end = dateTimeDate;
      newStructuredRecord.title = "Daily Record";
      console.log(newStructuredRecord);
      processedRecords.push(newStructuredRecord);
    }
    setProcessedRecords(processedRecords);
  };

  useEffect(() => {
    getRecords(setLoading, setRecords);
  }, []);

  useEffect(() => {
    console.log("Records changed");
    processRecords(records, setProcessedRecords);
  }, [records]);

  const [viewDayModalIsOpen, setViewDayModalIsOpen] = useState(false);
  const [createDayRecordModalIsOpen, setCreateDayRecordModalIsOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [dailyPlan, setDailyPlan] = useState("");
  const [dailyReflection, setDailyReflection] = useState("");
  const [dietFollowed, setDietFollowed] = useState(false);
  const [distractionBlockerOnAndUpdated, setDistractionBlockerOnAndUpdated] =
    useState(false);
  const [meditationToTime, setMeditationToTime] = useState(false);
  const [noPhone, setNoPhone] = useState(false);
  const [scrollingResisted, setScrollingResisted] = useState(false);
  const [startDayWithPlan, setStartDayWithPlan] = useState(false);
  const [takeDailySupplements, setTakeDailySupplements] = useState(false);

  const eventPropGetter = (event) => {
    const backgroundColor = event.color || "#3174ad"; // Default color if none specified
    return { style: { backgroundColor } };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setViewDayModalIsOpen(true);
  };

  const closeViewDayModal = () => {
    setViewDayModalIsOpen(false);
    setSelectedEvent(null);
  };

  const openCreateDayRecordModal = () => {
    setCreateDayRecordModalIsOpen(true);
  };

  const closeCreateDayRecordModal = () => {
    setCreateDayRecordModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
    const date = new Date(); // Today's date
    await createRecord(
      setLoading,
      setRecords,
      dailyPlan,
      dailyReflection,
      date,
      dietFollowed,
      distractionBlockerOnAndUpdated,
      id,
      meditationToTime,
      noPhone,
      scrollingResisted,
      startDayWithPlan,
      takeDailySupplements
    );
    closeCreateDayRecordModal();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chris's public goal tracking calendar</h1>
        {!viewDayModalIsOpen && !createDayRecordModalIsOpen && (
          <Calendar
            localizer={localizer}
            events={processedRecords}
            startAccessor="start"
            endAccessor="end"
            views={["month", "week"]}
            defaultView="month"
            style={{ height: 500, width: "80%", margin: "0 auto" }}
            eventPropGetter={eventPropGetter}
            onSelectEvent={handleEventClick}
          />
        )}
      </header>
      <Modal
        isOpen={viewDayModalIsOpen}
        onRequestClose={closeViewDayModal}
        contentLabel="Event Details"
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>Start: {selectedEvent.start.toString()}</p>
            <p>End: {selectedEvent.end.toString()}</p>
            <p>
              Exercise Before Work:{" "}
              {selectedEvent.exerciseBeforeWork ? "Yes" : "No"}
            </p>
            <p>
              Take Daily Supplements:{" "}
              {selectedEvent.takeDailySupplements ? "Yes" : "No"}
            </p>
            <p>
              Meditation To Time:{" "}
              {selectedEvent.meditationToTime ? "Yes" : "No"}
            </p>
            <p>Diet Followed: {selectedEvent.dietFollowed ? "Yes" : "No"}</p>
            <p>No Phone: {selectedEvent.noPhone ? "Yes" : "No"}</p>
            <p>
              Distraction Blocker On And Updated:{" "}
              {selectedEvent.distractionBlockerOnAndUpdated ? "Yes" : "No"}
            </p>
            <p>
              Scrolling Resisted:{" "}
              {selectedEvent.scrollingResisted ? "Yes" : "No"}
            </p>
            <p>
              Start Day With Plan:{" "}
              {selectedEvent.startDayWithPlan ? "Yes" : "No"}
            </p>
            <p>Daily Reflection: {selectedEvent.dailyReflection}</p>
            <p>Daily Plan: {selectedEvent.dailyPlan}</p>
            <button onClick={closeViewDayModal}>Close</button>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={createDayRecordModalIsOpen}
        onRequestClose={closeCreateDayRecordModal}
        contentLabel="Create Day Record"
      >
        <div>
          <h2>Create Day Record</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Daily Plan:</label>
              <input
                type="text"
                value={dailyPlan}
                onChange={(e) => setDailyPlan(e.target.value)}
              />
            </div>
            <div>
              <label>Daily Reflection:</label>
              <input
                type="text"
                value={dailyReflection}
                onChange={(e) => setDailyReflection(e.target.value)}
              />
            </div>
            <div>
              <label>Diet Followed:</label>
              <input
                type="checkbox"
                checked={dietFollowed}
                onChange={(e) => setDietFollowed(e.target.checked)}
              />
            </div>
            <div>
              <label>Distraction Blocker On And Updated:</label>
              <input
                type="checkbox"
                checked={distractionBlockerOnAndUpdated}
                onChange={(e) =>
                  setDistractionBlockerOnAndUpdated(e.target.checked)
                }
              />
            </div>
            <div>
              <label>Meditation To Time:</label>
              <input
                type="checkbox"
                checked={meditationToTime}
                onChange={(e) => setMeditationToTime(e.target.checked)}
              />
            </div>
            <div>
              <label>No Phone:</label>
              <input
                type="checkbox"
                checked={noPhone}
                onChange={(e) => setNoPhone(e.target.checked)}
              />
            </div>
            <div>
              <label>Scrolling Resisted:</label>
              <input
                type="checkbox"
                checked={scrollingResisted}
                onChange={(e) => setScrollingResisted(e.target.checked)}
              />
            </div>
            <div>
              <label>Start Day With Plan:</label>
              <input
                type="checkbox"
                checked={startDayWithPlan}
                onChange={(e) => setStartDayWithPlan(e.target.checked)}
              />
            </div>
            <div>
              <label>Take Daily Supplements:</label>
              <input
                type="checkbox"
                checked={takeDailySupplements}
                onChange={(e) => setTakeDailySupplements(e.target.checked)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <button onClick={closeCreateDayRecordModal}>Close</button>
        </div>
      </Modal>
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "36px",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={openCreateDayRecordModal}
      >
        +
      </button>
    </div>
  );
};

export default App;
