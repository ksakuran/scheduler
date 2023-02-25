import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE)
    console.log("clicked onAdd, transition to create")
  }

  const onCancel = () => {
    back();
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={"onSave"} onCancel={onCancel}/>}
    </article>
  );
}