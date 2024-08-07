const Listing = require("../model/listing.model");
const User = require("../model/user.model");
const errorHandeler = require("../utiles/error");
const bcrypt = require("bcryptjs");

const test = (req, res) => {
  res.json({
    message: "API Route is Good",
  });
};

const updateUserinfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandeler(401, "You can only update your Own Account"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandeler(401, "You can Only Delete Your Own Account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res

      .status(200)
      .clearCookie("access_token")
      .json("User Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandeler(401, "You can only view your own Listing"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandeler(404, "User Not Found"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  updateUserinfo,
  deleteUser,
  getUserListing,
  getUser,
};
