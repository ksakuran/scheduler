import { useState, useEffect } from "react";
import Axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const getSpotsForDay = (appointments) => {
    let days = [...state.days];
    //appointments param taken in from bookInterview or cancelInterview
    //is the new appointment added, or the one being taken away
    const appointmentsForDay = getAppointmentsForDay({ ...state, appointments }, state.day);
    const appointmentsArray = Object.values(appointmentsForDay)
    const spotsLeft = appointmentsArray.filter(appointment => !appointment.interview);
    days.forEach(day => {
      if (day.name === state.day) {
        day.spots = spotsLeft.length;
      }
    });
    return days;
  };


  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        if (res.status === 204){
          const days = getSpotsForDay(appointments)
          setState((prev) => ({ ...prev, appointments, days }));
        }
        return res;
      })
      .catch((error) => {
        console.log("error:", error.message);
        throw new Error
      })
  };

  const cancelInterview = (id) => {

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
          const days = getSpotsForDay(appointments)
          setState((prev) => ({ ...prev, appointments, days }));
        }
        return res;
      })
      .catch((error) => {
        console.log("error:", error.message);
        throw new Error
      })

  }

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);





  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;