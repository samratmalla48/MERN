import express from "express";
import dontenv from "dotenv";
dontenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
const port = process.env.PORT||5000;
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sendMail from './controllers/sendMail.js';
connectDB();

const app = express();
app.get("/mail", sendMail);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);



app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/verify/:token', async (req, res) => {
    const { token } = req.params;
  
    // Find the user by verification token.
    const user = await User.findOne({ verificationToken: token });
  
    if (!user) {
      res.status(404).json({ message: 'Invalid verification token' });
      return;
    }
  
    // Update user's verification status.
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
  
    res.json({ message: 'Email verified successfully' });
  });
