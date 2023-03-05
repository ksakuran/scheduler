import { useState, useEffect } from "react";
import Axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

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

  
  const updateSpotsForDays = (appointments) => {
    //appointments param taken in from bookInterview or cancelInterview
    //is the new appointment added, or the one being taken away

    // get list of appointments for state day using ready made selector
    const appointmentsForDay = getAppointmentsForDay(
      { ...state, appointments },
      state.day
    );
    const listOfAppointments = Object.values(appointmentsForDay);

    //calculate spots based on how many appointments have interviews with null value
    const spotsLeft = listOfAppointments.filter(
      (appointment) => !appointment.interview
    );
    const spots = spotsLeft.length;

    //get the current day, and create a new day object with accurate number of spots
    //to return to update state with in bookInterview or cancelInterview fns,
    const currentDay = state.days.find((day) => day.name === state.day);
    const newCurrentDay = { ...currentDay, spots };

    //get current day index so we can update the newDays at the correct position
    const newDays = [...state.days];
    const currentDayIndex = newDays.findIndex((day) => day.name === state.day);
    newDays[currentDayIndex] = newCurrentDay;

    const updatedDays = [...newDays];

    return updatedDays;
  };

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
        if (res.status === 204) {
          const days = updateSpotsForDays(appointments);
          setState((prev) => ({ ...prev, appointments, days }));
        }
        return res;
      })
      .catch((error) => {
        console.log("error:", error.message);
        throw new Error("cannot book interview");
      });
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

    return Axios.delete(`/api/appointments/${id}`, appointments)
      .then((res) => {
        if (res.status === 204) {
          const days = updateSpotsForDays(appointments);
          setState((prev) => ({ ...prev, appointments, days }));
        }
        return res;
      })
      .catch((error) => {
        console.log("error:", error.message);
        throw new Error("cannot cancel interview");
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
