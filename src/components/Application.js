import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    effect
  } = useApplicationData();


  const interviewersList = getInterviewersForDay(state, state.day);
  
  const dailyAppointments = Object.values(
    getAppointmentsForDay(state, state.day)
  );
  
  const schedule = dailyAppointments.map((appointment) => {

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  schedule.push(<Appointment key="last" time="5pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
