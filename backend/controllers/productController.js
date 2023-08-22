import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// const getProductById = asyncHandler(async (req, res) => {
//   console.log("rex")
//   // const product = await Product.findById(req.params.id);

//   // if (product) {
//   //   return res.json(product)
//   // }
// })

const createProduct = asyncHandler(async (req, res) => {
  console.log("check");
  const product = new Product({
    name: "Sample name",
    price: 0,
    //   user: '123',
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { createProduct, getProductById, getProducts };
