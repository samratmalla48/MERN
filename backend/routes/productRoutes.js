import express from 'express';
const router = express.Router();
import {
    createProduct,
} from '../controllers/productController.js';


// router.route('/x').get(getProducts).post(protect, admin, createProduct);
router.post('/product', createProduct);

export default router;