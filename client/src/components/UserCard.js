import React, { useState } from "react";
import { removeUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
import "./UserCard.css";
import AddEditForm from "./AddEditForm";

const UserCard = ({ user }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="user-card" onMouseLeave={() => setShow(false)}>
      <i
        className={`fas fa-ellipsis-v ${show && "action-btn"} `}
        onClick={() => setShow(!show)}
      />
      {show && (
        <ul className="action-menu">
          <li>
            <i className="fas fa-trash" />
            <span onClick={() => dispatch(removeUser(user._id))}>DELETE</span>
          </li>
          <li>
            <i className="fas fa-pen" />
            <AddEditForm
              oldUser={{
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                homeAddress: user.homeAddress,
              }}
              _id={user._id}
            />
          </li>
        </ul>
      )}
      <div className="user-info">
        <p>
          <i className="fas fa-user" />
          <span>{`${user.lname} ${user.fname}`} </span>
        </p>

        <p>
          <i className="fas fa-envelope" />
          <span> {user.email}</span>
        </p>
        <p>
          <i class="fas fa-map-marker-alt" />
          <span>{user.homeAddress}</span>
        </p>
        <p>
          <i className="fas fa-phone" />
          <span> {user.phoneNumber}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
