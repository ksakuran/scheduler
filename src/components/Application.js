import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  // sets days, empty array for dependency since days only needs to be set once
  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((res) => {
      // console.log("0", res[0].data);
      // console.log("1", res[1].data);
      // console.log("2", res[2].data);
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  const dailyAppointments = Object.values(
    getAppointmentsForDay(state, state.day)
  );
  const interviewersList = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("appointment:", appointment);
    console.log("appointments:", appointments);

    return Axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        if (res.status === 204){
        setState((prev) => ({ ...prev, appointments }));
        }
        return res;
        
      })
      .catch((error) => {
        console.log("error:", error.message);
      });
  };

  const cancelInterview = (id) => {
    // console.log("cancel interview function");
    // console.log("id in cancelInterview:", id);
    
    let interviewObj = state.appointments[id].interview
    console.log(state.appointments[id])

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Axios.delete(`/api/appointments/${id}`,appointments)
      .then((res) => {
        if (res.status === 204){
          //interviewObj = null;
          setState((prev) => ({ ...prev, appointments }));
        }
        return res;
      })
      .catch((error) => {
        console.log("error:", error.message);
      });

  }

  const schedule = dailyAppointments.map((appointment) => {
    //const interview = getInterview(state, appointment.interview);
    //console.log("interview in schedule:", interview);

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
