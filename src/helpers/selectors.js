const getAppointmentsForDay = (state, dayOfWeek) => {
  const days = state.days;
  let appointmentsArray = [];
  //if no days are exsisting in state data then return empty array
  if (days.length === 0) {
    return appointmentsArray;
  }
  
  //determine which day we are finding appointments for
  const currentDay = days.filter((day) => {
    return day.name === dayOfWeek;
  });

  if (currentDay.length > 0) {
    appointmentsArray = currentDay[0].appointments;
  }

  //return array of appointment objects
  const appointmentInfo = appointmentsArray.map((appt) => {
    return state.appointments[`${appt}`];
  });

  return appointmentInfo;
};


const getInterview = (state, appointmentInterview) => {
  if (appointmentInterview === null) {
    return null;
  }

  const interviewerId = appointmentInterview.interviewer;

  const interview = {
    student: appointmentInterview.student,
    interviewer: {
      id: interviewerId,
      name: state.interviewers[interviewerId].name,
      avatar: state.interviewers[interviewerId].avatar,
    },
  };

  return interview;
};


const getInterviewersForDay = (state, dayOfWeek) => {
  const days = state.days;
  let interviewersArray = [];

  //if no days are exsisting in state data then return empty array
  if (days.length === 0) {
    return interviewersArray;
  }

  //determine which day we are finding the interviewers for
  const currentDay = days.filter((day) => {
    return day.name === dayOfWeek;
  });

  if (currentDay.length > 0) {
    interviewersArray = currentDay[0].interviewers;
  }

  //create array of interviewer objects
  const interviewerInfo = interviewersArray.map((id) => {
    return state.interviewers[`${id}`];
  });

  return interviewerInfo;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
