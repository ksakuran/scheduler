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

/*The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:

{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
} 
state.appointments["2"].interview
*/

export function getInterview(state, appointmentIdInterview) {
  console.log("appointmentIdInterview", appointmentIdInterview)

  if (!appointmentIdInterview) {
    return null;
  }

  const interviewerId = appointmentIdInterview.interviewer;
 
  // if (!state.interviewers[interviewerId].name) {
    
  //   return null;
  // }
  console.log("interviewerId", interviewerId)
  console.log("state: in getInterview", state)
  console.log("state.interviewers.id:", state.interviewers[interviewerId])

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