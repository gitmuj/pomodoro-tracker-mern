import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
const alertStyle = {
  color: "black",
};

const AlertDismissible = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="danger">
        <Alert.Heading style={alertStyle}>
          One Pomordoro Cycle Completed
        </Alert.Heading>
        <p>Take a short break and get back to work.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="success">
            Close me and get back on track!
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default AlertDismissible;
