import React from "react";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";
import Tasks from "./Tasks";
import TaskModal from "./TaskModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styling/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <div>
        <div className="ui container">
          <Header />
        </div>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
