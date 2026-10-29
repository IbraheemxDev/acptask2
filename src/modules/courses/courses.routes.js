import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import {
  createCourse, getCourses, getCourseById, updateCourse, deleteCourse,
} from "./courses.controller.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;