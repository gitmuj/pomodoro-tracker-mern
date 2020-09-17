import React, { useState, useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addTomatoe, getTasks } from "../actions";
import AlertDismissible from "./AlertDissmissible";

const Timer = ({ task, addTomatoe, updateTaskList }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [button, setButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let interval = useRef();
  let minuteInterval = useRef();

  const handleStart = () => {
    if (seconds == 0) {
      setTimeout(() => {
        setSeconds(seconds => seconds + 59);
        setMinutes(minutes => minutes - 1);
      }, 1000);
    }
    setTimeout(() => {
      interval.current = setInterval(() => {
        setSeconds(seconds => {
          if (seconds > 0) {
            return seconds - 1;
          } else if (seconds == 0) {
            setMinutes(minutes => (minutes > 0 ? minutes - 1 : 0));

            return 59;
          }

          return seconds;
        });
      }, 1000);
    }, 1000);

    setButton(button => !button);
  };

  const handleStop = () => {
    setButton(button => !button);
    clearInterval(interval.current);
  };

  const handleReset = () => {
    clearInterval(interval.current);
    setMinutes(25);
    setSeconds(0);
    setButton(button => !button);
  };

  // read timer t o see if it has reached 00:00 , then add a tomatoe through action
  //recieve the selected task as property that is passed to the timer component

  const req = { id: task };
  if (minutes == 24 && seconds == 0) {
    clearInterval(interval.current);
    addTomatoe(req);
    updateTaskList();
    setMinutes(25);
    setShowModal(true);
  }

  const modalToggle = () => {};

  return (
    <React.Fragment>
      <Container>
        {showModal && <AlertDismissible />}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 className="timer" style={{ fontSize: "75px" }}>
            {minutes}:
            {seconds.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleStart()}
            disabled={button}
            style={{ margin: "5px" }}
          >
            Start
          </Button>
          <Button
            variant="danger"
            onClick={() => handleStop()}
            disabled={!button}
            style={{ margin: "5px" }}
          >
            Stop
          </Button>

          <Button
            variant="success"
            onClick={() => handleReset()}
            style={{ margin: "5px" }}
          >
            Reset
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default connect(null, { addTomatoe, getTasks })(Timer);
