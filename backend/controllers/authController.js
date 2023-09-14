// controllers/authController.js

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

// Function to send a verification email
const sendVerificationEmail = async (req, res) => {
  try {
    const user = req.user; // Assuming you have a middleware to get the user
    const token = generateToken(); // Generate a unique token
    user.verificationToken = token;
    await user.save();

    const verificationLink = `http://localhost:3000/verify-email/${token}`; // Update with your frontend URL
    const message = `Click the following link to verify your email: ${verificationLink}`;
    
    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      text: message,
    });

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while sending the email." });
  }
};

// Function to verify the email
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    const tokenResponse = generateToken(user._id);
    
    // You can return this token to the frontend for automatic login after email verification
    res.status(200).json({ message: "Email verified successfully", token: tokenResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while verifying the email." });
  }
};

export { sendVerificationEmail, verifyEmail };
