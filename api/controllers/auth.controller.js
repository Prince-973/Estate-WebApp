const User = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const errorHandeler = require("../utiles/error");
const jwt = require("jsonwebtoken");

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
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandeler(404, "User not Found"));
    }
    const validpassword = bcryptjs.compareSync(password, validUser.password);
    if (!validpassword) {
      return next(errorHandeler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
