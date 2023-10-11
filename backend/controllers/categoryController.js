import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);

  // Check if a category with the same name (case-insensitive) already exists
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  if (existingCategory) {
    res.status(400);
    throw new Error("Category with the same name already exists");
  }

  const category = new Category({
    name,
    user: req.user._id, // You can replace this with req.user._id if needed
  });

  const createdCategory = await category.save();
  res.status(201).json({
    createdCategory,
    message: "Categories create sucessfully",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const Categories = await Category.find({});
  res.json(Categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne({ _id: category._id });
    res.json({ message: "category removed" });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

export { createCategory, getCategories, deleteCategory };
