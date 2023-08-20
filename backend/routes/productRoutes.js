import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

import {
    createProduct,
} from '../controllers/productController.js';

router.get('/', asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(products);
}));


// router.route('/x').get(getProducts).post(protect, admin, createProduct);
// router.post('/product', createProduct);

export default router;