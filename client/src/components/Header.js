import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";

const Header = ({ isSignedIn, signOut }) => {
  const renderButtons = () => {
    if (isSignedIn) {
      return (
        <Nav.Item>
          <Link to="/login">
            <Button
              variant="warning"
              ahref=""
              style={{ margin: "5px" }}
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </Link>
        </Nav.Item>
      );
    } else {
      return (
        <>
          <Nav.Item>
            <Link to="/login">
              <Button variant="warning" ahref="" style={{ margin: "5px" }}>
                Login
              </Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/signup"}>
              <Button variant="primary" style={{ margin: "5px" }}>
                Sign Up
              </Button>
            </Link>
          </Nav.Item>{" "}
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <Navbar className="navbar navbar-dark bg-success">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          Pomodoro Task Tracker
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {renderButtons()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return { isSignedIn: state.user.isSignedIn };
};

export default connect(mapStateToProps, { signOut })(Header);
