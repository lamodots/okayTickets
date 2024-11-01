import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = asyncHandler(async(req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from Header
      token = req.headers.authorization.split(" ")[1];
      // Verify Token and return payload
      const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Get User from DB using payload
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});
