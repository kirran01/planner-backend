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
  let myUser;
  User.findOne({
    email,
  })
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("invalid email or password");
      }
      myUser = foundUser;
      console.log(foundUser);
      return bcryptjs.compare(password, foundUser.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        return Promise.reject("invalid email or password");
      }
      const payload = {
        _id: myUser._id,
        name: myUser.name,
        email: myUser.email,
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

module.exports = { loginController, signupController };
