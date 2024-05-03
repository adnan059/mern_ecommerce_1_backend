const jwt = require("jsonwebtoken");
const createError = require("./error");

// ********** verify token **********
const verifyToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SK);

      console.log(decoded);

      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

      next();
    } catch (error) {
      next(createError(403, "Token is not valid"));
    }
  } else {
    return next(createError(401, "You are not authenticated"));
  }
};

// ************ verify user ***********
const verifyUser = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SK);

      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(401, "You are not authorized"));
      }
    } catch (error) {
      next(createError(403, "Token is not valid"));
    }
  } else {
    return next(createError(401, "You are not authenticated"));
  }
};

// *********** verify admin *************

const verifyAdmin = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SK);

      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

      if (!req.user.isAdmin) return next(createError(401, "You are not admin"));

      next();
    } catch (error) {
      next(createError(403, "Token is not valid"));
    }
  } else {
    return next(createError(401, "You are not authenticated"));
  }
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
