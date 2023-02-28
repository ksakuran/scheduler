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



export function getInterview(state, appointmentIdInterview) {


  if (!appointmentIdInterview) {
    return null;
  }

  const interviewerId = appointmentIdInterview.interviewer;


  const interview = {
    student: appointmentIdInterview.student,
    interviewer: {
      id: interviewerId,
      name: state.interviewers[interviewerId].name,
      avatar: state.interviewers[interviewerId].avatar
    }
  };

  return interview;
}


export function getInterviewersForDay(state, dayOfWeek) {
  const days = state.days;
  let interviewersArray = [];

  if (days.length === 0) {
    return interviewersArray;
  }

  const interviewerDay = days.filter(day => {
    return day.name === dayOfWeek;
  });


  if (interviewerDay.length > 0) {
    interviewersArray = interviewerDay[0].interviewers;
  }

  const interviewerInfo = interviewersArray.map((inter) => {
    return state.interviewers[`${inter}`];
  });

  return interviewerInfo;
};