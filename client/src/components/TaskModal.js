import React, { useState } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { addTask, getTasks } from "../actions";

const TaskModal = props => {
  const [show, setShow] = useState(false);

  const [values, setValues] = useState("");

  const handleClose = () => {
    setShow(false);
    props.onAddTask();
  };
  const handleShow = () => setShow(true);

  const onChange = e => {
    setValues(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newTask = {
      name: values,
      date: new Date(),
      user: props.userId,
    };
    props.addTask(newTask);
    props.getTasks(props.userId);
  };

  return (
    <Container>
      <Button variant="success" onClick={handleShow} style={{ margin: "5px" }}>
        Add task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="task">
              <Form.Label>Enter task details below:</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={onChange} />
            </Form.Group>

            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ margin: "5px" }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit" style={{ margin: "5px" }}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, { addTask, getTasks })(TaskModal);
