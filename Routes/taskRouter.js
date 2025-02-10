import express from "express";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getUserTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", deleteTask);

export default router;
