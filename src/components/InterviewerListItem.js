import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const interviewerListImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  });

  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className={interviewerListImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <span>{props.name}</span>}
    </li>
  );
}
