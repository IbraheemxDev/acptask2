import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import {
  createCategory, getCategories, getCategoryById, updateCategory, deleteCategory,
} from "./categories.controller.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;