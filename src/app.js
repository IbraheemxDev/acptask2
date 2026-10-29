import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import categoryRoutes from "./modules/categories/categories.routes.js";
import courseRoutes from "./modules/courses/courses.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Course Management API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;