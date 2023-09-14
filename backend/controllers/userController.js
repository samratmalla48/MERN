import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import cryptoRandomString from 'crypto-random-string';


// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // res.status(401);
  // throw new Error('Someting went wrong')
  // res.status(200).json({ message: 'Auth User' })

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
const verificationToken = cryptoRandomString({ length: 64, type: 'url-safe' });

user.verificationToken = verificationToken;
await user.save();

  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
    isVerified:false,
  });
  const verificationLink = `${req.protocol}://${req.get('host')}/verify/${verificationToken}`;


  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      emai: user.email,
      isAdmin: user.isAdmin,
      isVerified:user.isVerified
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // console.log(name);
  // res.status(200).json({message: 'Register User'});
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout User" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: "User profile" });

  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      emai: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: "Update User Profile" });
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("delete user");
});
const getUsers = asyncHandler(async (req, res) => {
  res.send("delete user");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
  updateUser,
};
