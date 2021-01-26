import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, edditUserById } from "../actions/userActions";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    background: "#f9f9f9",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
    width: "100vw",
  },
};

Modal.setAppElement("#root");

function AddEditForm({ oldUser, _id }) {
  const dispatch = useDispatch();
  const addNewUser = (formData) => dispatch(addUser(formData));
  const editUser = (id, formData) => dispatch(edditUserById(id, formData));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
  });
  useEffect(() => {
    oldUser
      ? setForm(oldUser)
      : setForm({
          fname: "",
          lname: "",
          email: "",
          phoneNumber: "",
          homeAddress: "",
        });
  }, [modalIsOpen, oldUser]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    oldUser ? editUser(_id, form) : addNewUser(form);
    closeModal();
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <React.Fragment>
      {oldUser ? (
        <span onClick={openModal}>Edit</span>
      ) : (
        <i className="fas fa-plus add-btn" onClick={openModal} />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>{oldUser ? "Edit User" : "Add User"}</h2>
        <form className="add-edit-form" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            onChange={handleChange}
            name="fname"
            value={form.fname}
            type="text"
            placeholder="Enter your first name..."
            required
          />
          <label>Last Name</label>
          <input
            onChange={handleChange}
            name="lname"
            value={form.lname}
            type="text"
            placeholder="Enter your last name..."
            required
          />
          <label>Email</label>
          <input
            onChange={handleChange}
            name="email"
            value={form.email}
            type="email"
            placeholder="Enter your email..."
            required
          />
          <label>Phone Number</label>
          <input
            onChange={handleChange}
            name="phoneNumber"
            value={form.phoneNumber}
            type="tel"
            required
            placeholder="Enter your phone Number..."
          />
          <label>Home Address</label>
          <input
            onChange={handleChange}
            name="homeAddress"
            value={form.homeAddress}
            type="text"
            required
            placeholder="Enter your home address..."
          />
          <div>
            <button type="submit">Confirm</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default AddEditForm;
