import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import { getTasks, deleteTask } from "../actions";
import TaskModal from "../components/TaskModal";
import Timer from "../components/Timer";
import tomatoIcon from "./images/tomato.png";
import "./styling/App.css";
import axios from "axios";

const taskStyle = {
  color: "black",
  fontSize: "18px",

  backgroundColor: "white",
};

class Tasks extends React.Component {
  state = { selectedTask: null, tomatoeAdded: false };

  constructor(props) {
    super(props);
    this.renderTasks = this.renderTasks.bind(this);
  }
  componentDidMount() {
    if (this.props.userId) {
      this.props.getTasks(this.props.userId);
    }
  }

  onDeleteTask = e => {
    const id = e.target.getAttribute("id");
    this.props.deleteTask(id);
    this.props.getTasks(this.props.userId);
  };

  onAddTask = () => {
    this.props.getTasks(this.props.userId);
  };

  handleSelect = id => {
    this.setState({ selectedTask: id });
  };

  renderTomatoes = numberOfTomatoes => {
    const tomatoes = [];
    for (let i = 0; i < numberOfTomatoes; i++) {
      tomatoes.push(<img src={tomatoIcon} className="tomato-icon"></img>);
    }

    return tomatoes;
  };

  activeTask = id => {
    if (this.state.taskId == id) {
      return "active";
    }
  };

  renderTasks(tasks) {
    if (tasks != null && tasks.length > 0) {
      return tasks.map(task => (
        <tr
          onClick={e => this.handleSelect(task._id)}
          className={this.state.selectedTask == task._id ? "active" : ""}
          style={taskStyle}
          key={task._id}
        >
          <td className="table-col">
            {task.name}
            <Button
              variant="danger"
              style={{ float: "right" }}
              id={task._id}
              onClick={this.onDeleteTask}
            >
              Delete
            </Button>{" "}
          </td>
          <td className="table-col">{this.renderTomatoes(task.tomatoes)}</td>
        </tr>
      ));
    }

    return [];
  }

  async componentDidUpdate(prevProps, PrevState) {
    const response = await axios.get(`api/users/${this.props.userId}/tasks`);

    let previousTomatoeCount = 0;
    let currentCount = 0;

    prevProps.tasks.forEach(task => {
      previousTomatoeCount += task.tomatoes;
    });

    const tasks = response.data;

    tasks.forEach(task => {
      currentCount += task.tomatoes;
    });
  }

  updateTaskList = () => {
    this.props.getTasks(this.props.userId);
  };

  render() {
    return (
      <React.Fragment>
        <Timer
          task={this.state.selectedTask}
          updateTaskList={this.updateTaskList}
        />
        <div>
          <TaskModal onAddTask={this.onAddTask} />
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Number of Pomodoro Cycles</th>
                </tr>
              </thead>
              <tbody>{this.renderTasks(this.props.tasks)}</tbody>
            </Table>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.user.isSignedIn,
    userId: state.user.userId,
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, { getTasks, deleteTask })(Tasks);
