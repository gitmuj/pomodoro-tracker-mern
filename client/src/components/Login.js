import React from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { login } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = { buttonDisabled: false };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const values = { name: this.state.username, password: this.state.password };
    this.props.login(values);
    // this.setState({ buttonDisabled: true });
  };
  render() {
    if (this.props.isSignedIn) {
      return <Redirect to="/tasks" />;
    }
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={this.handleUsernameChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                disabled={this.state.buttonDisabled}
                type="submit"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.user.isSignedIn };
};

export default connect(mapStateToProps, { login })(Login);
