// import express from "express";
// const router = express.Router();
// import { sendVerificationEmail, verifyEmail } from "../controllers/authController.js";

// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   getUsers,
//   getUserById,
//   deleteUser,
//   updateUserProfile,
//   updateUser
// } from "../controllers/userController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

// router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.post("/auth", authUser);
// router.post("/logout", logoutUser);
// router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
// router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);
// router.post("/send-verification-email", sendVerificationEmail);
// router.get("/verify-email/:token", verifyEmail);
// export default router;
// routes/userRoutes.js




import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
  updateUser
} from "../controllers/userController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";
import { sendVerificationEmail, verifyEmail } from "../controllers/authController.js"; // Import the new controllers

const router = express.Router();

router.route('/').post(registerUser).get(  getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get( getUserProfile).put( updateUserProfile);
router.route("/:id").delete( deleteUser).get(getUserById).put(  updateUser);

// Add the new routes for email verification
router.post("/send-verification-email",  sendVerificationEmail);
router.get("/verify-email/:token", verifyEmail);

export default router;
