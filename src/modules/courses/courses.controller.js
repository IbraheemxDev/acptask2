import mongoose from "mongoose";
import Course from "./courses.model.js";
import Category from "../categories/categories.model.js";

const notFound = (res) =>
  res.status(404).json({ success: false, message: "Course not found" });

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || price === undefined || !category)
      return res.status(400).json({
        success: false,
        message: "title, description, price and category are required",
      });

    if (!mongoose.isValidObjectId(category) || !(await Category.findById(category)))
      return res.status(404).json({ success: false, message: "Category not found" });

    const course = await Course.create({ title, description, price, category });
    res.status(201).json({ success: true, message: "Course created", data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("category", "name");
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const course = await Course.findById(req.params.id).populate("category", "name");
    if (!course) return notFound(res);
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return notFound(res);
    res.status(200).json({ success: true, message: "Course updated", data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return notFound(res);
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};