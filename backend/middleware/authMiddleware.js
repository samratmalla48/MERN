import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      if (req.user.isEmailVerified) {
        next(); // Allow access to protected routes if email is verified
      } else {
        res.status(401);
        throw new Error("Email not verified");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Email not Verified ");
    }
  } else {
    res.status(401);
    throw new Error("Email not verified");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
};

export { admin, protect };
