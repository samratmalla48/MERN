import path from "path";
import express from "express";
import dontenv from "dotenv";
dontenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.get("/", (req, res) => res.send("Server is ready"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// post /api - register user
// post /api/users/auth - authenticate a user and age a token
// post /api/users/logout - Logout user and clear cookie
// get /api/users/profile - Get user profile
// put /api/users/profile - Update profile
