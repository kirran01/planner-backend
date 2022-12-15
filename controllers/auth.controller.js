const loginController = (req, res) => {
  res.send("pizza!");
};

const signupController = (req, res) => {
  res.send("cookies!");
};

module.exports = { loginController, signupController };
