const errorHandeler = require("../utiles/error");
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) {
    return next(errorHandeler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorHandeler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
module.exports = verifyUser;
