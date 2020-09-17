import React from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createUser, checkUsername, checkEmail } from "../actions";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const history = useHistory();

  const validate = values => {
    const errors = {};
    props.checkEmail(values.email);
    props.checkUsername(values.name);

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 25) {
      errors.name = "Must be 25 characters or less";
    } else if (props.username_check.length > 0) {
      errors.name = "Username already exists, please use another one.";
    } else if (/\s/g.test(values.name)) {
      errors.name = "Username cannot have blank spaces.";
    } // check if username is available

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    } else if (props.email_check.length > 0) {
      errors.email = "Email already exists.";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: values => {
      props.createUser(values);
    },
  });

  if (props.isSignedIn === true) history.push("/tasks");

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Username</Form.Label>
              <Form.Control
                name="name"
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Form.Group>
            <Button
              variant="secondary"
              type="reset"
              onClick={formik.handleReset}
              style={{ margin: "5px" }}
            >
              {" "}
              Reset
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    isSignedIn: state.user.isSignedIn,
    username_check: state.user.username_check,
    email_check: state.user.email_check,
  };
};

export default connect(mapStateToProps, {
  createUser,
  checkUsername,
  checkEmail,
})(SignUp);
