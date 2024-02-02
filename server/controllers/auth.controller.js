const User = require("../model/user");
const { passport } = require("passport");

module.exports.Login = async (req, res, next) => {
  // Add an empty cart in the session if there is no cart

  console.log(req.user);
  console.log(req.session);
  res.send("LogedIn");
};

module.exports.Signup = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, passport, phone } = req.body;
    const newUser = new User({ username, email, phone });
    const user = await User.register(newUser, password);
    return res
      .status(201)
      .json({ result: true, message: "User Created", user });
  } catch (err) {
    return res.status(400).json({ result: false, message: err.message });
  }
};

module.exports.Logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      res.send("err");
    }
    console.log(req.user);
    res.status(200).send("LogedOut");
  });
};

module.exports.Islogin = async (req, res, next) => {
  res.send("logedIn User");
};
