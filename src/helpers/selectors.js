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
  
  if (appointmentIdInterview === null) {
    return null;
  }

  const interviewerId = appointmentIdInterview.interviewer

  const interview = {  
    "student": appointmentIdInterview.student,
    "interviewer": {  
      "id": interviewerId,
      "name": state.interviewers[interviewerId].name,
      "avatar": state.interviewers[interviewerId].avatar
    }
  }

  return interview;
}
