import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 

function InterviewerList(props){

  //props.interviewers = array
  //props.setInterviewer pass to item
  //interviewer:number represents the id of the currently selected interviewer

  const listItems = props.interviewers.map(
    (interviewer) => {
      return (<InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={() => props.onChange(interviewer.id)}
        />
      );
    }
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  );
};

// InterviewerList.propTypes = {
//   interviewers: PropTypes.array.isRequired
// };

export default InterviewerList