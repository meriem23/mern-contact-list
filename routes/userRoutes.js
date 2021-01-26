const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

/*POST user */
//APTH : /api/users/addUser
router.post("/addUser", (req, res) => {
  const { fname, lname, email, phoneNumber, homeAddress } = req.body;
  const newUser = new User({
    fname,
    lname,
    email,
    phoneNumber,
    homeAddress,
  });
  newUser
    .save()
    .then((user) => res.send({ user }))
    .catch((err) => res.status(400).send({ msg: "ERROR ADDING USER" }));
});

/* GET all users*/
//PATH: /api/users/
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch((err) => res.status(400).send({ msg: "ERROR GET USERS" }));
});

/*GET user by ID */
//PATH: /api/users/:userID
router.get("/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findById(userID)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "ERROR GET USER" }));
});

/*PUT - edit a user by ID*/
//PATH: /api/users/updateUser/:userID
router.put("/updateUser/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findByIdAndUpdate(userID, { ...req.body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.send({ msg: "User updated", user });
    })
    .catch((err) => res.status(400).send({ msg: "ERROR UPDATING USER" }));
});

/*DELETE user by ID */
//PATH: /api/users/deleteUser/:userID
router.delete("/deleteUser/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findByIdAndDelete(userID)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.send({ msg: "User deleted", user });
    })
    .catch((err) => res.status(400).send({ msg: "ERROR DELETING USER" }));
});
module.exports = router;
