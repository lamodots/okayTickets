import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// @desc  Register a new User
// @route /api/users
// @acess public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }
  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new error("Invalid user data")
  }
});



// @desc  Login User
// @route /api/users/login
// @acess public
export const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)

    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }

});

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY , { expiresIn: "2d" })
}

// @desc  Get current User
// @route /api/users/me
// @acess private
export const getMe = asyncHandler(async (req, res) => {
  const {id, name, email} = req.user
  res.status(200).json({id,name,email})
})