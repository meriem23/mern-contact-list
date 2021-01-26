import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../actions/userActions";
import AddEditForm from "./AddEditForm";
import UserCard from "./UserCard";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const users = useSelector((state) => state.userReducer.users);
  return (
    <div>
      <AddEditForm />
      <div className="users-container">
        {users.map((el) => (
          <UserCard key={el._id} user={el} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
