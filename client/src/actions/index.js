import {
  CREATE_USER,
  CHECK_USERNAME,
  CHECK_EMAIL,
  LOGIN,
  ADD_TASK,
  GET_TASK,
  GET_TASKS,
  SIGN_OUT,
  DELETE_TASK,
  ADD_TOMATOE,
} from "./types";
import axios from "axios";

export const createUser = userValues => async dispatch => {
  const response = await axios.post("/api/users", userValues);

  dispatch({ type: CREATE_USER, payload: response.data });
};

export const checkUsername = username => async dispatch => {
  const params = { name: username };
  const response = await axios.post("/api/users/checkusername", params);
  console.log(response);

  dispatch({ type: CHECK_USERNAME, payload: response.data });
};

export const checkEmail = email => async dispatch => {
  const params = { email: email };
  const response = await axios.post("/api/users/checkemail", params);
  dispatch({ type: CHECK_EMAIL, payload: response.data });
};

export const login = values => async dispatch => {
  const response = await axios.post("/api/users/login", values);
  console.log(response);

  dispatch({ type: LOGIN, payload: response.data });
};

export const signOut = () => dispatch => {
  dispatch({ type: SIGN_OUT, payload: false });
};

export const addTask = values => async dispatch => {
  const response = await axios.post("api/tasks", values);

  dispatch({ type: ADD_TASK, payload: response.data });
};

export const deleteTask = id => async dispatch => {
  const response = axios.delete(`api/tasks/${id}`);
  dispatch({ type: DELETE_TASK });
};

export const getTasks = id => async dispatch => {
  const response = await axios.get(`api/users/${id}/tasks`);

  dispatch({ type: GET_TASKS, payload: response.data });
};

export const getTask = id => async dispatch => {
  const response = await axios.get(`api/tasks/${id}`);

  dispatch({ type: GET_TASK, payload: response.data });
};

export const addTomatoe = values => async dispatch => {
  const response = await axios.put(`api/tasks/addtomatoe`, values);

  dispatch({ type: ADD_TOMATOE, payload: response.data });
};
