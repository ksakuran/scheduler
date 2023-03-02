import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };

  const onCancel = () => {
    back();
  };

  const onClose = () => {
    back();
    back();
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const onEdit = (id) => {
    transition(EDIT);
  };

  const onDelete = (id) => {
    transition(CONFIRM);
  };

  const onDeleteConfirm = (id) => {
    transition(DELETE, true);

    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETE && <Status message={"Deleting"} />}

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === ERROR_DELETE && (
        <Error onClose={onClose} message={"Cannot delete interview"} />
      )}

      {mode === ERROR_SAVE && (
        <Error onClose={onClose} message={"Cannot save interview"} />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            onDelete(props.id);
          }}
          onEdit={() => {
            onEdit(props.id);
          }}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
          placeholder={"Enter Student Name"}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={() => {
            onDeleteConfirm(props.id);
          }}
          onCancel={onCancel}
        />
      )}
    </article>
  );
}
