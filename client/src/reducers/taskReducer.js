import {
  ADD_TASK,
  GET_TASKS,
  GET_TASK,
  DELETE_TASK,
  ADD_TOMATOE,
} from "../actions/types";

const intitalState = {
  tasks: [],
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
      };
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case DELETE_TASK:
      return { ...state };
    case GET_TASK:
      return { ...state, task: action.payload };

    case ADD_TOMATOE:
      return { ...state };
    default:
      return state;
  }
};
