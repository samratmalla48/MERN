import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, createCategory)
  .get(protect, admin, getCategories);
router.route("/:id").delete(protect, admin, deleteCategory);

export default router;
