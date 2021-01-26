import axios from "axios";
import { GET_USERS, ADD_USER } from "./types";

/* GET all users*/
//PATH: /api/users/
export const getUsers = () => (dispatch) => {
  axios
    .get("/api/users")
    .then(({ data }) => {
      dispatch({
        type: GET_USERS,
        payload: data,
      });
    })
    .catch((err) => {
      alert("ERROR GET USERS");
    });
};

/*DELETE user by ID */
//PATH: /api/users/deleteUser/:userID
export const removeUser = (id) => (dispatch) => {
  axios
    .delete(`/api/users/deleteUser/${id}`)
    .then((response) => dispatch(getUsers()))
    .catch((err) => {
      alert("ERROR DELETE");
    });
};

/*POST user */
//PATH : /api/users/addUser
export const addUser = (newUser) => (dispatch) => {
  axios
    .post("/api/users/addUser", newUser) //req.body
    .then(({ data }) =>
      dispatch({
        type: ADD_USER,
        payload: data, //new user object
      })
    )
    .catch((err) => {
      alert("ERROR ADD NEW USER");
    });
};

/*PUT - edit a user by ID*/
//PATH: /api/users/updateUser/:userID
export const edditUserById = (id, editUser) => (dispatch) => {
  axios
    .put(`/api/users/updateUser/${id}`, editUser)
    .then((re) => dispatch(getUsers()));
};
