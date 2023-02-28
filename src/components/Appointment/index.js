import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE"

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
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=> {
      //console.log("inside .then in save fn, transition show")
      transition(SHOW);
    })

  }

  const onDelete = (id) => {
    
    transition(CONFIRM)

  }

  const onDeleteConfirm = (id) => {
   
    transition(DELETE);

    props.cancelInterview(id)
    .then(()=> {
      transition(EMPTY);
    })
  } 

 

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        onDelete={()=>{onDelete(props.id)}}/>}
      
      {mode === EMPTY && <Empty 
        onAdd={onAdd}/>}
      
      {mode === CREATE && <Form 
        interviewers={props.interviewers}  
        onSave={save} 
        onCancel={onCancel} />}
      
      {mode === SAVING && <Status 
        message={"Saving"}/>}
      
      {mode === DELETE && <Status 
        message={"Deleting"}/>}
      
      {mode === CONFIRM && <Confirm 
        message={"Are you sure you would like to delete?"}
        onConfirm={()=> {onDeleteConfirm(props.id)}}
        onCancel={onCancel}/>}

    </article>
  );
}

