const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const loginController = (req, res) => {
  res.send("loginroute hit!");
};

const signupController = (req, res) => {
  const { email, password, name } = req.body;
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      error: {
        message: "field(s) are missing",
      },
    });
  }
  bcryptjs.hash(password, 10)
  .then((hashedPassword) => {
    return User.create({
      email,
      name,
      password: hashedPassword,
    })
      .then((createdUser) => {
        res.send(createdUser);
      })
      .catch((err) => {
        res.send(err,"err");
      });
  });
};

module.exports = { loginController, signupController };
