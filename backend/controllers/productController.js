import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const getProducts = asyncHandler(async (req, res) => {
  
  const keyword = req.query.keyword ? { name: { $regex: req. query. keyword, $options: 'i' } }: {};
  const products = await Product.find({ ...keyword });
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


const getTopProducts = asyncHandler(async (req, res) => {
  console.log("Handling request for /api/products/top"); // Add this line for debugging
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});


const createProduct = asyncHandler(async (req, res) => {
  console.log("check");
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { createProduct, getProductById, getProducts, updateProduct,getTopProducts, };
