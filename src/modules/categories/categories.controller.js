import mongoose from "mongoose";
import Category from "./categories.model.js";

const notFound = (res) =>
  res.status(404).json({ success: false, message: "Category not found" });

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ success: false, message: "name is required" });

    const category = await Category.create({ name, description });
    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: "Category already exists" });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const category = await Category.findById(req.params.id);
    if (!category) return notFound(res);
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return notFound(res);
    res.status(200).json({ success: true, message: "Category updated", data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return notFound(res);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};