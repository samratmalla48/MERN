import express from "express";
const router = express.Router();
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
// router.post('/product', createProduct);

export default router;
