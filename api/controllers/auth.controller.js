const User = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const errorHandeler = require("../utiles/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newuser = new User({ username, email, password: hashedPassword });
  try {
    await newuser.save();
    res.status(201).json("User created Succesfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
