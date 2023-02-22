import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

//props: id of interviewer, name of interviewer, avatar url of image for interviewer
//needs to know if it selected boolean

export default function InterviewerListItem(props) {

  const handleClick = () => {
    props.setInterviewer(props.id)
  };

  const interviewerListItemClass = classNames("interviewers__item",{
    "interviewers__item--selected": props.selected
  });

  const interviewerListImageClass = classNames("interviewers__item-image",{
    "interviewers__item--selected-image": props.selected
  });




  return (
    <li className={interviewerListItemClass} onClick={handleClick}>
      <img
        className={interviewerListImageClass}
        src={props.avatar}
        alt={props.name}
      />
        {props.selected && <span>{props.name}</span>}
    </li>
  );
}