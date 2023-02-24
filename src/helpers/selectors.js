export function getAppointmentsForDay(state, dayOfWeek) {
  const days = state.days;
  let appointmentsArray = [];

  if (days.length === 0) {
    return appointmentsArray;
  }

  const appointmentDay = days.filter(day => {
    return day.name === dayOfWeek;
  });


  if (appointmentDay.length > 0) {
    appointmentsArray = appointmentDay[0].appointments;
  }

  const appointmentInfo = appointmentsArray.map((appt) => {
    return state.appointments[`${appt}`];
  });

  return appointmentInfo;
};
