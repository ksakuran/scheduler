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

  //console.log("props in appointment component: ", props)

  const onAdd = () => {
    transition(CREATE);
    console.log("clicked onAdd, transition to create")
  }

  const onCancel = () => {
    back();
  }

  const save = (name, interviewer) => {

    console.log("name in save fn:", name)
 
    const interview = {
      student: name,
      interviewer
    };
    
    console.log("interview.student in save fn", interview.student)

    props.bookInterview(props.id, interview)
    .then(()=> {
      console.log("inside .then in save fn, transition show")
      transition(SHOW);
    })

  }



  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE && <Form interviewers={props.interviewers}  onSave={save} onCancel={onCancel}/>}
    </article>
  );
}