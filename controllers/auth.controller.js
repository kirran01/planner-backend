const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const loginController = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: {
        message: "field(s) are blank",
      },
    });
  }
  let updatedUser;
  User.findOne({
    email,
  })
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("invalid email or password");
      }
      updatedUser = foundUser;
      console.log(foundUser);
      return bcryptjs.compare(password, foundUser.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        return Promise.reject("invalid email or password");
      }
      const payload = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      };
      console.log("This is the payload --->", payload);
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "72h",
      });
      res.json({
        authToken: authToken,
        hi: "hello",
      });
    })
    .catch((err) => {
      res.send(err);
    });
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
  bcryptjs.hash(password, 10).then((hashedPassword) => {
    return User.create({
      email,
      name,
      password: hashedPassword,
    })
      .then((createdUser) => {
        res.send(createdUser);
      })
      .catch((err) => {
        res.send(err, "err");
      });
  });
};

const editUserController = (req, res) => {
  User.findByIdAndUpdate(req.payload._id, req.body, { new: true })
    .then((updatedUser) => {
      console.log(req.payload._id, req.body);
      const payload = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      };
      console.log("This is the payload --->", payload);
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "72h",
      });
      res.send({ updatedUser: updatedUser, updatedToken: authToken });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { loginController, signupController, editUserController };
