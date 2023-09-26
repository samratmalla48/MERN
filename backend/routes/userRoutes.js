import express from "express";
import User from "../models/userModel.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.get("/verify-email/:verificationToken", async (req, res) => {
  
  const { verificationToken } = req.params;
 
  // Find the user by verification token and set isEmailVerified to true
  const user = await User.findOne({ verificationToken });
  
  if (user) {
    user.isEmailVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    // Redirect to the home page of your website
    res.redirect("http://localhost:3000/login"); // You can change the URL to your home page
  } else {
    // Handle the case where the verification token is invalid or expired
    res.redirect("http://localhost:3000/invalid-token");
  }
});

export default router;
